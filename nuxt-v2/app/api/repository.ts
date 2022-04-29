import { Context } from '@nuxt/types'
import { HydraGetAllResponse, HydraMemberObject, normalize } from './hydra'
import SubmissionError from '../error/SubmissionError'

// eslint-disable-next-line no-undef
export type FormOptions = RequestInit & {
  params?: {[propertyPath: string]: string}
}

export interface Repository<U extends HydraMemberObject> {
  call: (query: string, options: FormOptions) => Promise<Response>
  validateAndDecodeResponse : (url: string, options?: object) => Promise<any>
  $findAll: (params: object) => Promise<HydraGetAllResponse<U>>
  $find: (id: string) => Promise<U>
  $create: (payload: object) => Promise<U>
  $remove: (item: U) => Promise<any>
  $update: (item: U) => Promise<U>
  $post: (url: string, options: FormOptions) => Promise<U>
}

export interface FormViolation {
  message: string
  propertyPath: string
}

export interface FormErrors {
  _error: string
  [propertyPath: string]: string
}

const makeParamArray = (key: string, arr: string[]) =>
  arr.map(val => `${key}[]=${val}`).join('&')

export default (context: Context, { resource }: { resource: string }): Repository<any> => ({
  async call (query, options = {}) {
    const jsonLdMimeType = 'application/ld+json'
    options.headers = options.headers as Record<string, string>

    if (options.headers === undefined) {
      options.headers = {}
    }
    if (process.server) {
      options.headers.cookie = context.req.headers.cookie || ''
    }
    let isFile = false
    if (process.client) {
      isFile = (options.body instanceof FormData)
    }
    if (options.headers.Accept === undefined && !isFile) {
      options.headers.Accept = jsonLdMimeType
    }
    if (process.client && options.body !== null && !isFile && options.headers['Content-Type'] === undefined) {
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

    const payload = !isFile && options.body && JSON.parse(options.body.toString())
    if (payload !== undefined && (payload as HydraMemberObject)['@id']) {
      options.body = JSON.stringify(normalize(payload))
    }

    const entryPoint = process.env.apiBaseUrl + (process.env.apiBaseUrl?.endsWith('/') ? '' : '/')
    return await fetch(new URL(query, entryPoint).toString(), options)
  },

  async validateAndDecodeResponse (url, options = {}) {
    const response = await this.call(url, options)
    if (response.ok) {
      return await response.status === 204 ? 'ok' : response.json()
    }
    // TODO deal with refresh token in the future
    if (response.status === 401 && context.route.name !== 'login') {
      await context.$auth.logout()
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

    const errors: FormErrors = { _error: error }
    json.violations.forEach((violation: FormViolation) =>
      errors[violation.propertyPath]
        ? (errors[violation.propertyPath] +=
              '\n' + errors[violation.propertyPath])
        : (errors[violation.propertyPath] = violation.message)
    )
    throw new SubmissionError(errors)
  },

  async $findAll (params: FormOptions = {}) {
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
  },

  async $post (url, options) {
    return await this.validateAndDecodeResponse(url, options)
  }
})
