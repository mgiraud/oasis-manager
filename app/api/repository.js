import isObject from 'lodash/isObject'
import { normalize } from './hydra'
import SubmissionError from '~/error/SubmissionError'

const makeParamArray = (key, arr) =>
  arr.map(val => `${key}[]=${val}`).join('&')

export default (context, { resource }) => ({
  async call (query, options = {}) {
    const jsonLdMimeType = 'application/ld+json'

    if (typeof options.headers === 'undefined') {
      options.headers = {}
    }
    if (process.server) {
      options.headers.cookie = context.req.headers.cookie
    }
    if (options.headers.Accept === undefined) {
      options.headers.Accept = jsonLdMimeType
    }
    if (process.client && options.body !== 'undefined' && !(options.body instanceof FormData) && options.headers['Content-Type'] === undefined) {
      options.headers['Content-Type'] = jsonLdMimeType
    }

    options.credentials = 'include'

    if (options.params) {
      const params = normalize(options.params)
      const queryString = Object.keys(params)
        .map(key =>
          Array.isArray(params[key])
            ? makeParamArray(key, params[key])
            : `${key}=${params[key]}`
        )
        .join('&')
      query = `${query}?${queryString}`
    }

    const payload = options.body && JSON.parse(options.body)
    if (isObject(payload) && payload['@id']) {
      options.body = JSON.stringify(normalize(payload))
    }

    const entryPoint = process.env.apiBaseUrl + (process.env.apiBaseUrl.endsWith('/') ? '' : '/')
    return await fetch(new URL(query, entryPoint), options)
  },

  async validateAndDecodeResponse (url, options = {}) {
    const response = await this.call(url, options)
    if (response.ok) {
      return await response.status === 204 ? 'ok' : response.json()
    }
    // TODO deal with refresh token in the future
    if (response.status === 401 && context.route.name !== 'login') {
      await context.store.dispatch('security/logout')
      return context.redirect({ name: 'login' })
    }
    let json = null
    try {
      json = await response.json()
    } catch (e) {
      throw new Error(response.statusText || 'An error occurred.')
    }

    const error =
          json['hydra:description'] ||
          json['hydra:title'] ||
          'An error occurred.'
    if (!json.violations) { throw new Error(error) }

    const errors = { _error: error }
    json.violations.forEach(violation =>
      errors[violation.propertyPath]
        ? (errors[violation.propertyPath] +=
              '\n' + errors[violation.propertyPath])
        : (errors[violation.propertyPath] = violation.message)
    )
    throw new SubmissionError(errors)
  },

  async $findAll (params = {}) {
    params.method = 'GET'
    return await this.validateAndDecodeResponse(resource, params)
  },

  async $find (id) {
    const params = { method: 'GET' }
    return await this.validateAndDecodeResponse(id, params)
  },

  async $create (payload) {
    return await this.validateAndDecodeResponse(resource, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async $remove (item) {
    return await this.validateAndDecodeResponse(item['@id'], { method: 'DELETE' })
  },

  async $update (payload) {
    return await this.validateAndDecodeResponse(payload['@id'], {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }
})
