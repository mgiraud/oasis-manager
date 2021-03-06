import { Context } from '@nuxt/types'
import { computed, defineNuxtPlugin, ToRefs, toRefs } from '@nuxtjs/composition-api'
import { Cookie } from './auth/cookie'
import Token from './auth/token'
import { Member } from '~/custom-store/MemberStore'
import { Repository } from '~/api/repository'
import { securityStore, SecurityStore, LoginCredentials, SecurityState } from '~/custom-store/SecurityStore'

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

class Auth {
  ctx: Context
  store: SecurityStore
  state: ToRefs<SecurityState>
  memberRepository: Repository<Member>
  cookie: Cookie

  token: Token | null = null
  refreshToken: Token | null = null

  constructor (ctx: Context) {
    this.ctx = ctx
    this.store = securityStore
    this.store.setContext(ctx)
    this.state = toRefs(securityStore.getState())
    this.memberRepository = ctx.$getRepository('members')
    this.cookie = new Cookie(ctx)
  }

  loggedIn = computed(() => this.state.loggedIn)
  member = computed(() => this.state.member)
  isAdmin = computed(() => {
    return this.state.member.value !== null && this.state.member.value.isAdmin
  })

  reset () {
    this.token?.resetCookie()
    this.refreshToken?.resetCookie()
  }

  async logout () {
    await this.store.logout()
    this.reset()
  }

  async loginRequest (credentials: LoginCredentials): Promise<boolean> {
    return await this.store.login(credentials)
  }

  async check (): Promise<boolean> {
    if (!this.refreshToken || !this.refreshToken.isValid) {
      this.reset()
      return Promise.resolve(false)
    }

    if (!this.token || !this.token.isValid) {
      await this._refreshTokens()
      return Promise.resolve(!!this.token && this.token.isValid)
    }

    return Promise.resolve(true)
  }

  private async _fetchMember () {
    if (!this.token || !this.token.isValid) {
      return Promise.resolve(null)
    }
    return await this.store.fetchMember()
  }

  private _initTokens () {
    try {
      this.token = new Token(this.cookie, 'BEARER')
      this.refreshToken = new Token(this.cookie, 'REFRESH')
    } catch (e) {
      // console.log(e)
    }
  }

  private async _refreshTokens () {
    await this.memberRepository.call('refresh', {})
    this._initTokens()
  }

  async init (): Promise<any> {
    this._initTokens()
    if (await this.check()) {
      this.store.setLoggedIn(true)
      await this._fetchMember()
    }
  }
}

export default defineNuxtPlugin(async (ctx, inject) => {
  const $auth = new Auth(ctx)
  inject('auth', $auth)
  ctx.$auth = $auth

  try {
    await $auth.init()
  } catch (error) {
    if (process.client) {
      console.error('[ERROR] [AUTH]', error)
    }
  }
})
