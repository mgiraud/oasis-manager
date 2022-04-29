import { Context } from '@nuxt/types'
import cookie from 'cookie'

interface CookieOption {
    prefix: string
    options: {
        path: string
        expires?: Date
        maxAge?: number
        domain?: string
        secure?: boolean
        sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined
    }
}
export class Cookie {
    public ctx: Context
    options: CookieOption

    constructor (ctx: Context) {
      this.ctx = ctx
      this.options = {
        prefix: '',
        options: {
          path: '/',
          secure: true,
          sameSite: 'lax'
        }
      }
    }

    syncCookies (key: string, defaultValue?: unknown): unknown {
      let value = this.getCookie(key)

      if (isUnset(value) && isSet(defaultValue)) {
        value = defaultValue
      }

      if (isSet(value)) {
        this.setCookie(key, value)
      }

      return value
    }

    getCookies (): Record<string, unknown> {
      const cookieStr = process.client
        ? document.cookie
        : this.ctx.req.headers.cookie

      return cookie.parse(cookieStr || '') || {}
    }

    setCookie<V extends unknown> (
      key: string,
      value: V,
      options: { prefix?: string } = {}
    ): V | null {
      if (process.server && !this.ctx.res) {
        return null
      }

      const _prefix =
          options.prefix !== undefined ? options.prefix : this.options.prefix
      const _key = _prefix + key
      const _options = Object.assign({}, this.options.options, options)
      const _value = encodeValue(value)

      // Unset null, undefined
      if (isUnset(value)) {
        _options.maxAge = -1
      }

      // Accept expires as a number for js-cookie compatiblity
      if (typeof _options.expires === 'number') {
        _options.expires = new Date(Date.now() + _options.expires * 864e5)
      }

      const serializedCookie = cookie.serialize(_key, _value, _options)

      if (process.client) {
      // Set in browser
        document.cookie = serializedCookie
      } else if (process.server && this.ctx.res) {
      // Send Set-Cookie header from server side
        const cookies = (this.ctx.res.getHeader('Set-Cookie') as string[]) || []
        cookies.unshift(serializedCookie)
        this.ctx.res.setHeader(
          'Set-Cookie',
          cookies.filter(
            (v, i, arr) =>
              arr.findIndex(val =>
                val.startsWith(v.substr(0, v.indexOf('=')))
              ) === i
          )
        )
      }

      return value
    }

    getCookie (key: string): unknown {
      if (!this.options || (process.server && !this.ctx.req)) {
        return
      }

      const _key = this.options.prefix + key

      const cookies = this.getCookies()

      const value = cookies[_key]
        ? decodeURIComponent(cookies[_key] as string)
        : undefined

      return decodeValue(value)
    }

    removeCookie (key: string, options?: { prefix?: string }): void {
      this.setCookie(key, undefined, options)
    }
}

export const isSet = (o: unknown): boolean => !isUnset(o)

export const isUnset = (o: unknown): boolean =>
  typeof o === 'undefined' || o === null

export function encodeValue (val: unknown): string {
  if (typeof val === 'string') {
    return val
  }
  return JSON.stringify(val)
}

export function decodeValue (val: unknown): unknown {
  // Try to parse as json
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch (_) {}
  }

  // Return as is
  return val
}
