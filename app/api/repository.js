import SubmissionError from '~/error/SubmissionError'

export default (context, { name, mutations }) => ({
  async call (url, options = {}) {
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

    const link = url.includes(process.env.apiBasePath) ? (process.env.apiBaseUrl + url) : (process.env.apiBaseUrl + process.env.apiBasePath + url)
    return await fetch(link, options)
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

  handleErrors (error, autoDispatch) {
    if (autoDispatch) {
      if (error instanceof SubmissionError) {
        context.store.commit(`${name}/setError`, error.errors._error)
        context.store.commit(`${name}/setViolations`, error.errors)
      } else {
        context.store.commit(`${name}/setError`, error.message)
      }
    } else {
      throw error
    }
  },

  async $get (url, options = {}, autoDispatch = true) {
    options.method = 'GET'
    const [err, responseBody] = await this.to(this.validateAndDecodeResponse(url, options))
    if (err) { return this.handleErrors(err, autoDispatch) }
    const body = responseBody ? responseBody['hydra:member'] : null
    if (autoDispatch && mutations.$get) {
      context.store.commit(`${name}/${mutations.$get}`, body)
    }
    return body
  },

  async $getOne (url, options = {}, autoDispatch = true) {
    options.method = 'GET'
    const [err, body] = await this.to(this.validateAndDecodeResponse(url, options))
    if (err) { return this.handleErrors(err, autoDispatch) }
    if (autoDispatch && mutations.$getOne) {
      context.store.commit(`${name}/${mutations.$getOne}`, body)
    }
    return body
  },

  async $post (url, options = {}, autoDispatch = true) {
    options.method = 'POST'
    const [err, body] = await this.to(this.validateAndDecodeResponse(url, options))
    if (err) { return this.handleErrors(err, autoDispatch) }
    if (autoDispatch && mutations.$post) {
      context.store.commit(`${name}/${mutations.$post}`, body)
    }
    return body
  },

  to (promise) {
    return promise.then((data) => {
      return [null, data]
    })
      .catch(err => [err])
  }
})
