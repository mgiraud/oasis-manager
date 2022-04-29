import { defineStore } from 'pinia'
import { HydraMemberObject } from '~/types/hydra'

export interface Credentials {
  email: string,
  password: string
}

interface AuthStore {
  user: Member|null,
  credentialError: boolean,
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
  state: (): AuthStore => {
    return {
      user: null,
      credentialError: false,
    }
  },
  getters: {
    isLogged(state): boolean {
      return state.user !== null
    },
    isAdmin(state): boolean {
      return state.user && state.user.isAdmin
    }
  },
  actions: {
    async login (credentials: Credentials) {
      this.credentialError = false
      await this.$nuxt.$apiFetch('/login_check', {
        method: 'POST',
        body: credentials
      }).catch(() => {
        this.credentialError = true
      })

      await this.getUser()
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
      try {
        await this.$nuxt.$apiFetch('/refresh', {
          method: 'POST',
        })

        await this.getUser()
      } catch (e) {

      }
    },
  }
})
