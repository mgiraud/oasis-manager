export default (context, name) => ({
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
    if (!response.ok) {
      // TODO deal with form errors and the refresh token in the future
      if (response.status === 401) {
        await context.store.dispatch('security/logout', { repository: context.$repository.member })
        return context.redirect({ name: 'login' })
      }
      return null
    }
    return await response.status === 204 ? 'ok' : response.json()
  },

  async $get (url, options = {}) {
    options.method = 'GET'
    const responseBody = await this.validateAndDecodeResponse(url, options)
    return responseBody ? responseBody['hydra:member'] : null
  },

  async $getOne (url, options = {}) {
    options.method = 'GET'
    return await this.validateAndDecodeResponse(url, options)
  },

  async $post (url, options = {}) {
    options.method = 'POST'
    return await this.validateAndDecodeResponse(url, options)
  }
})
