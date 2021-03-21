import type { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '.'
import { HydraMemberObject } from '~/api/hydra'
const fs = process.server ? require('fs') : null
const path = process.server ? require('path') : null

export type Groups = HydraMemberObject & {
  name: string
}

export type User = HydraMemberObject & {
  email: string;
  groupPermissionsOverrideType: number;
  groups: Groups[];
  id: number;
  isAdmin: boolean;
  memberPermissions: string[];
  nickname: string | null;
  permissions: string[];
}

export interface SecurityState {
  permissions: string[];
  credentialError: boolean;
}

export const state = (): SecurityState => ({
  permissions: [],
  credentialError: false
})

export const mutations: MutationTree<SecurityState> = {
  SET_PERMISSIONS (state, permissions) {
    state.permissions = permissions
  },
  SET_CREDENTIAL_ERROR (state, inError) {
    state.credentialError = inError
  }
}

export const actions: ActionTree<SecurityState, RootState> = {
  loadPermissions ({ commit }) {
    fs.readFile(path.resolve('app/security/permissions.json'), 'utf8', (err: Error, data: string) => {
      if (err) { throw err }
      commit('SET_PERMISSIONS', JSON.parse(data))
    })
  },
  async login ({ commit }, credentials) {
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
