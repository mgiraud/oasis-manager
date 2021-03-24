import { Context, Plugin } from '@nuxt/types'
import { Store } from 'vuex'
import Token from './auth/token'
import { Repository } from '~/api/repository'
import { LoginCredentials, SecurityState } from '~/store/security'

const cookieparser = process.server ? require('cookieparser') : undefined

declare module 'vue/types/vue' {
    interface Vue {
        $auth(message: string): void
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $auth(message: string): void
    }

    interface Context {
        $auth(message: string): void
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $auth(message: string): void
    }
}

interface AuthCookie {
    BEARER : string
    REFRESH: string
}

class Auth {
    ctx: Context
    store: Store<any>
    state: SecurityState
    memberRepository: Repository

    token: Token | null = null
    refreshToken: Token | null = null

    constructor (ctx: Context) {
      this.ctx = ctx
      this.store = ctx.store
      this.state = this.store.state.security
      this.memberRepository = ctx.$getRepository('members')
    }

    loggedIn (): boolean {
      return this.state.loggedIn
    }

    async logout (): Promise<Response> {
      return await this.memberRepository.call('logout', {})
    }

    async loginRequest (credentials: LoginCredentials): Promise<boolean> {
      return await this.store.dispatch('security/login', credentials)
    }

    fetchUser () {
      try {
        this.memberRepository.$find('me').then((me) => {
        })
      } catch (e: Error) {
      }
    }

    initTokens (parsedCookies: AuthCookie) {
      try {
        this.token = Token.createFromRawToken(parsedCookies.BEARER)
        this.refreshToken = Token.createFromRawToken(parsedCookies.REFRESH)
      } catch (e) {
        console.log(e)
      }
    }

    init (): Promise<any> | void {
      if (!process.server) {
        return
      }
      const parsed = cookieparser.parse(this.ctx.req.headers.cookie) as AuthCookie | null
      if (!parsed || !parsed.BEARER || !parsed.REFRESH) {
        return this.logout()
      }
      this.initTokens(parsed)
      this.fetchUser()
    }
}

const authPlugin: Plugin = (context: Context, inject) => {
  const $auth = new Auth(context)
  inject('auth', $auth)
  context.$auth = $auth

  return $auth.init()
  //   .catch((error) => {
  //     if (process.client) {
  //       // if (error instanceof ExpiredAuthSessionError) {
  //       //     return
  //       // }

//       console.error('[ERROR] [AUTH]', error)
//     }
//   })
}

export default authPlugin
