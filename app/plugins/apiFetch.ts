import { $fetch } from 'ohmyfetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const entryPoint = config.API_BASE_URL + (config.API_BASE_URL?.endsWith('/') ? '' : '/')
  const fetch = $fetch.create({
    baseURL: entryPoint,
    headers: {
      Accept: 'application/ld+json',
      'Content-Type': 'application/ld+json',
      ...useRequestHeaders(['cookie'])
    },
    credentials: 'include',
  })

  return {
    provide: {
      apiFetch: fetch
    },
  }
})
