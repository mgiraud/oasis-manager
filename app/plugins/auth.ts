import { Context, Plugin } from '@nuxt/types'
import { Store } from 'vuex'
import Token, { TokenStatusEnum } from './auth/token'
import { Cookie } from './auth/cookie'
import { Repository } from '~/api/repository'
import { LoginCredentials, SecurityState } from '~/store/security'
import { Member } from '~/store/member'

declare module 'vue/types/vue' {
    interface Vue {
        $auth: Auth
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $auth: Auth
    }

    interface Context {
        $auth: Auth
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $auth: Auth
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
    member: Member | null
    cookie : Cookie

    token: Token | null = null
    refreshToken: Token | null = null

    constructor (ctx: Context) {
      this.ctx = ctx
      this.store = ctx.store
      this.state = this.store.state.security
      this.memberRepository = ctx.$getRepository('members')
      this.member = null
      this.cookie = new Cookie(ctx)
    }

    get loggedIn (): boolean {
      return this.state.loggedIn
    }

    async logout () {
      await this.store.dispatch('security/logout')
    }

    async login (credentials: LoginCredentials) {
      const loggedIn = await this.store.dispatch('security/login', credentials)
      if (loggedIn === true) {
        await this._fetchMember()
      }
    }

    get isAdmin (): boolean {
      return this.store.state.security.member !== null && this.store.state.security.member.isAdmin
    }

    async loginRequest (credentials: LoginCredentials): Promise<boolean> {
      return await this.store.dispatch('security/login', credentials)
    }

    private async _fetchMember () {
      if (!this.token || !this.token.isValid) {
        return Promise.resolve(null)
      }
      return await this.store.dispatch('security/fetchMember')
    }

    private _initTokens () {
      try {
        this.token = new Token(this.cookie, 'BEARER')
        this.refreshToken = new Token(this.cookie, 'REFRESH')
      } catch (e) {
        console.log(e)
      }
    }

    private async _refreshTokens () {
      await this.memberRepository.call('refresh', {})
      this._initTokens()
    }

    async init (): Promise<any> {
      this._initTokens()

      if (!this.token?.isValid) {
        if (!this.refreshToken?.isValid) {
          return Promise.resolve(null)
        } else {
          await this._refreshTokens()
        }
      }

      this.member = await this._fetchMember()
      // console.log(this.member)
      this.store.commit('security/SET_LOGGED_IN', true)
    }
}

const authPlugin: Plugin = (context: Context, inject) => {
  const $auth = new Auth(context)
  inject('auth', $auth)
  context.$auth = $auth

  $auth.init()
    .catch((error) => {
      if (process.client) {
        // if (error instanceof ExpiredAuthSessionError) {
        //     return
        // }

        console.error('[ERROR] [AUTH]', error)
      }
    })
}

export default authPlugin
