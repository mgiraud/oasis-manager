import { defineStore } from 'pinia'
import { HydraMemberObject } from '~/types/hydra'

export interface Credentials {
  email: string,
  password: string
}

interface AuthState {
  user: Member|null,
  credentialError: boolean,
  refreshError: boolean,
  loading: boolean,
}

export interface Member extends HydraMemberObject {
  id: number
  email: string
  nickname: string
  permissions: string[]
  memberPermissions: string[]
  groupPermissionsOverrideType: number
  groups: Member[]
  isAdmin: boolean
}

export const useAuthStore = defineStore('main', {
  state: (): AuthState => {
    return {
      user: null,
      credentialError: false,
      refreshError: true,
      loading: false,
    }
  },
  getters: {
    isLogged(state): boolean {
      return state.user !== null
    },
    isAdmin(state): boolean {
      return state.user !== null && state.user.isAdmin
    }
  },
  actions: {
    async login (credentials: Credentials) {
      this.credentialError = false
      this.loading = true
      await this.$nuxt.$apiFetch('/login_check', {
        method: 'POST',
        body: credentials
      }).catch(() => {
        this.credentialError = true
      })
      this.loading = false;

      if (!this.credentialError) {
        await this.getUser()
      }
    },
    async register (credentials: Credentials) {
      await this.$nuxt.$apiFetch('/auth/register', {
        method: 'POST',
        body: credentials
      })

      await this.getUser()
    },
    async getUser () {
      this.user = await this.$nuxt.$apiFetch('/me')
    },
    async refresh () {
      this.refreshError = false
      await this.$nuxt.$apiFetch('/refresh', {
        method: 'POST',
      }).catch(() => {
        this.refreshError = true
      })

      if (!this.refreshError) {
        await this.getUser()
      }
    },
    async logout () {
      await this.$nuxt.$apiFetch('/logout')
      this.user = null
    },

    // unused for now
    loadPermissions (): string[] {
      // const data = fs.readFileSync(path.resolve('app/security/permissions.json'), { encoding: 'utf8', flag: 'r' })
      // return JSON.parse(data)
    }
  }
})
