import type { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '.'
const fs = process.server ? require('fs') : null
const path = process.server ? require('path') : null

export interface SecurityState {
  permissions: string[]
  credentialError: boolean
  loggedIn: boolean,
  tokenExpiration: number
  refreshTokenExpiration: number
}

export interface LoginCredentials {
  email: string,
  password: string
}

export const state = (): SecurityState => ({
  permissions: [],
  credentialError: false,
  loggedIn: false,
  tokenExpiration: 0,
  refreshTokenExpiration: 0
})

const MUTATIONS = {
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  SET_CREDENTIAL_ERROR: 'SET_CREDENTIAL_ERROR',
  SET_TOKEN_EXPIRATION: 'SET_TOKEN_EXPIRATION',
  SET_REFRESH_TOKEN_EXPIRATION: 'SET_REFRESH_TOKEN_EXPIRATION'
}

export const mutations: MutationTree<SecurityState> = {
  [MUTATIONS.SET_PERMISSIONS] (state, permissions: string[]) {
    state.permissions = permissions
  },
  [MUTATIONS.SET_CREDENTIAL_ERROR] (state, inError: boolean) {
    state.credentialError = inError
  },
  [MUTATIONS.SET_TOKEN_EXPIRATION] (state, expireAt: number) {
    state.tokenExpiration = expireAt
  },
  [MUTATIONS.SET_REFRESH_TOKEN_EXPIRATION] (state, expireAt: number) {
    state.refreshTokenExpiration = expireAt
  }
}

export const actions: ActionTree<SecurityState, RootState> = {
  loadPermissions ({ commit }) {
    fs.readFile(path.resolve('app/security/permissions.json'), 'utf8', (err: Error, data: string) => {
      if (err) { throw err }
      commit('SET_PERMISSIONS', JSON.parse(data))
    })
  },
  async login ({ commit }, credentials: LoginCredentials) {
    commit('SET_CREDENTIAL_ERROR', false)
    try {
      // @ts-ignore
      await this.$getRepository('members').call('login_check', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      // @ts-ignore
      const user = await this.$getRepository('members').$find('me')
      // @ts-ignore
      this.$storage.setUniversal('user', user)
      return true
    } catch (e) {
      commit('SET_CREDENTIAL_ERROR', true)
      // @ts-ignore
      this.$storage.setUniversal('user', null)
      return false
    }
  },
  async logout () {
    // @ts-ignore
    this.$storage.setUniversal('user', null)
    // @ts-ignore
    return await this.$getRepository('members').call('logout')
  }
}

export const getters: GetterTree<SecurityState, RootState> = {
  isAdmin: (_state, _getters, rootState) => {
    const user = rootState.storage ? rootState.storage.user : null
    return user instanceof Object && user.isAdmin
  },
  isLoggedIn: (_state, _getters, rootState) => {
    return rootState.storage && rootState.storage.user instanceof Object
  },
  hasPermission: (_state, _getters, rootState) => (permission: string | null) => {
    if (permission === null) { return false }
    const user = rootState.storage ? rootState.storage.user : null
    return !!(user && user.permissions && user.permissions.includes(permission))
  },
  hasPermissions: (_state, getters) => (permissions: string[]) => {
    return !permissions.some((permission) => {
      return !getters.hasPermission(permission)
    })
  }
}
