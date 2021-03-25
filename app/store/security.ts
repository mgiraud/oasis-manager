import type { GetterTree, ActionTree, MutationTree } from 'vuex'
import Vue from 'vue'
import { Member } from './member'
import { RootState } from '.'
const fs = process.server ? require('fs') : null
const path = process.server ? require('path') : null

export interface SecurityState {
  permissions: string[]
  credentialError: boolean
  loggedIn: boolean
  tokenExpiration: number
  refreshTokenExpiration: number
  member : Member | null
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
  refreshTokenExpiration: 0,
  member: null
})

const MUTATIONS = {
  SET_LOGGED_IN: 'SET_LOGGED_IN',
  SET_MEMBER: 'SET_MEMBER',
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
  },
  [MUTATIONS.SET_MEMBER] (state, member: Member | null) {
    Vue.set(state, 'member', member)
  },
  [MUTATIONS.SET_LOGGED_IN] (state, loggedIn: boolean) {
    state.loggedIn = loggedIn
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
      await this.$getRepository('members').call('login_check', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      return true
    } catch (e) {
      commit('SET_CREDENTIAL_ERROR', true)
      return false
    }
  },
  async logout ({ commit }) {
    await this.$getRepository('members').call('logout', {})
    commit('SET_LOGGED_IN', false)
    commit('SET_MEMBER', null)
  },
  reset ({ commit }) {
    commit('SET_LOGGED_IN', false)
    commit('SET_MEMBER', null)
  },
  async fetchMember ({ commit }) {
    try {
      const member: Member = await this.$getRepository('members').$find('me')
      commit('SET_MEMBER', member)
    } catch (e) {
      commit('SET_MEMBER', null)
    }
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
