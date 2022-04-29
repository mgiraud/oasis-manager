import { Context } from '@nuxt/types'
import { reactive, Ref } from '@nuxtjs/composition-api'
import { PersistentStore, UseContextReturn } from './AbstractStore'
import { Member } from './MemberStore'

const fs = process.server ? require('fs') : null
const path = process.server ? require('path') : null

export interface LoginCredentials {
  email: string,
  password: string
}

export interface SecurityState {
  permissions: Ref<string[]> | null
  credentialError: boolean
  loggedIn: boolean
  tokenExpiration: number
  refreshTokenExpiration: number
  member: Member | null
}

export class SecurityStore extends PersistentStore<SecurityState> {
  protected context!: UseContextReturn | Context

  protected data (): SecurityState {
    return reactive({
      permissions: null,
      credentialError: false,
      loggedIn: false,
      tokenExpiration: 0,
      refreshTokenExpiration: 0,
      member: null
    })
  }

  public setContext (context: UseContextReturn | Context) {
    this.context = context
  }

  loadPermissions (): string[] {
    const data = fs.readFileSync(path.resolve('app/security/permissions.json'), { encoding: 'utf8', flag: 'r' })
    return JSON.parse(data)
  }

  async login (credentials: LoginCredentials) {
    this.state.credentialError = false
    try {
      const res = await this.context.$getRepository<Member>(this.storeName).call('login_check', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      if (res.status !== 204) {
        this.state.credentialError = true
        return false
      }
      return true
    } catch (e) {
      this.state.credentialError = true
      return false
    }
  }

  async logout () {
    await this.context.$getRepository<Member>(this.storeName).call('logout', {})
    this.reset()
  }

  reset () {
    this.state.loggedIn = false
    this.state.member = null
  }

  async fetchMember () {
    try {
      const member = await this.context.$getRepository<Member>(this.storeName).$find('me')
      this.state.member = member
      return member
    } catch (e) {
      this.state.member = null
      return null
    }
  }

  hasPermission (permission: string | null) {
    if (permission === null) {
      return false
    }
    return !!(this.state.member && this.state.member.permissions && this.state.member.permissions.includes(permission))
  }

  hasPermissions (permissions: string[]) {
    return !permissions.some((permission) => {
      return !this.hasPermission(permission)
    })
  }

  setLoggedIn (loggedIn: boolean) {
    this.state.loggedIn = loggedIn
  }

  setPermissions (permissions: Ref<string[]>) {
    this.state.permissions = permissions
  }
}

export const securityStore = new SecurityStore('members')
