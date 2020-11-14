export function call (url, options = {}) {
  const jsonLdMimeType = 'application/ld+json'

  if (typeof options.headers === 'undefined') {
    options.headers = new Headers()
  }
  if (options.headers.get('Accept') === null) {
    options.headers.set('Accept', jsonLdMimeType)
  }
  if (options.body !== 'undefined' && !(options.body instanceof FormData) && options.headers.get('Content-Type') === null) {
    options.headers.set('Content-Type', jsonLdMimeType)
  }

  options.credentials = 'include'

  const link = url.includes(process.env.apiBasePath) ? (process.env.apiBaseUrl + url) : (process.env.apiBaseUrl + process.env.apiBasePath + url)
  return fetch(link, options)
}

export default call
