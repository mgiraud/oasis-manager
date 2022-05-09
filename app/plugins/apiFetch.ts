import * as https from 'https'
import { $fetch } from 'ohmyfetch'
import { useAuthStore } from '~/store/auth'
import { normalize } from '~/types/hydra'
import { FormErrors, FormViolation } from '~~/nuxt-v2/app/api/repository'
import SubmissionError from '~~/nuxt-v2/app/error/SubmissionError'

const makeParamArray = (key: string, arr: string[]) =>
  arr.map(val => `${key}[]=${val}`).join('&')

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  const entryPoint = config.API_BASE_URL + (config.API_BASE_URL?.endsWith('/') ? '' : '/')
  const jsonLdMimeType = 'application/ld+json'
  const route = useRoute()
  const authStore = useAuthStore()

  const fetch = $fetch.create({
    baseURL: entryPoint,
    headers: {
      ...useRequestHeaders(['cookie'])
    },
    credentials: 'include',
    async onRequest({ request, options }) {
      let isFile = false
      if (process.client) {
        isFile = (options.body instanceof FormData)
      }
      if (!isFile) {
        options.headers['Accept'] = jsonLdMimeType
      } else {
        delete options.headers['Accept']
      }
      if (request.body !== null) {
        if (!isFile) {
          options.headers['Content-Type'] = jsonLdMimeType
        } else {
          delete options.headers['Content-Type']
        }
      }

      if (process.server && process.env.NODE_ENV === 'development') {
        const agent = new https.Agent({
          rejectUnauthorized: false
        })
        options.agent = agent
      }

      if (options.params) {
        const params = normalize(options.params)
        const queryString = Object.keys(params)
          .map(key =>
            Array.isArray(params[key])
              ? makeParamArray(key, params[key])
              : `${key}=${params[key]}`
          )
          .join('&')
        request = `${request}?${queryString}`
      }
    },
    async onRequestError({ request, options, error }) {
      console.log('[fetch request error]', request, error)
    },
    async onResponse({ request, response, options }) {
      if (response.ok) {
        return
      }
      if (response.status === 401 && route.name !== 'login' && !request.includes('/refresh')) {
        await authStore.logout()
        navigateTo({ path: 'login' })
      }
      const error =
        response._data['hydra:description'] ||
        response._data['hydra:title'] ||
        'An error occurred.'
      if (!response._data.violations) { throw new Error(error) }

      const errors: FormErrors = { _error: error }
      response._data.violations.forEach((violation: FormViolation) =>
        errors[violation.propertyPath]
          ? (errors[violation.propertyPath] +=
            '\n' + errors[violation.propertyPath])
          : (errors[violation.propertyPath] = violation.message)
      )
      throw new SubmissionError(errors)
    },
    async onResponseError({ request, response, options }) {
      // Log error
      console.log('[fetch response error]', request, response.status, response._data)
    }
  })


  return {
    provide: {
      apiFetch: fetch
    },
  }
})
