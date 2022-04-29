import { defineStore } from 'pinia'

interface AuthPayload {
  accessToken: string,
  refreshToken: string
}

interface AuthStore {
  accessToken: string|null,
  refreshToken: string|null,
  user: string|null,
  credentialError: boolean,
}

export const useAuthStore = defineStore('main', {
  state: (): AuthStore => {
    return {
      accessToken: null,
      refreshToken: null,
      user: null,
      credentialError: false,
    }
  },
  actions: {
    async login (email: string, password: string) {
      this.credentialError = false
      try {
        const res = await this.$axios.$post('/login_check', {
          email,
          password
        })
        this.accessToken = res.accessToken
        this.refreshToken = res.refreshToken

        this.getUser()

      } catch (e) {
        this.credentialError = true
      }
    },
    async register (email: string, password: string) {
      const res = await this.$axios.$post('/auth/register', {
        email,
        password
      })

      this.setTokens(res)
      this.getUser()
    },
    async getUser () {
      const res = await this.$axios.$get('/auth/user')

      this.user = res
    },
    async refresh () {
      const res = await this.$axios.$post('/auth/refresh', {
        refreshToken: this.refreshToken
      })

      this.accessToken = res.accessToken
      this.refreshToken = res.refreshToken
    },
    setTokens (res: AuthPayload) {
      this.accessToken = res.accessToken
      this.refreshToken = res.refreshToken
    }
  }
})
