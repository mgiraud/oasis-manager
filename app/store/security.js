const fs = process.server ? require('fs') : null
const path = process.server ? require('path') : null

export const state = () => ({
  permissions: [],
  credentialError: false
})

export const mutations = {
  setPermissions (state, permissions) {
    state.permissions = permissions
  },
  setCredentialError (state, inError) {
    state.credentialError = inError
  }
}

export const actions = {
  loadPermissions ({ commit }) {
    fs.readFile(path.resolve('app/security/permissions.json'), 'utf8', (err, data) => {
      if (err) { throw err }
      commit('setPermissions', JSON.parse(data))
    })
  },
  async login ({ commit }, credentials) {
    commit('setCredentialError', false)
    try {
      await this.$getRepository('members').call('login_check', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      const user = await this.$getRepository('members').$find('me')
      this.$storage.setUniversal('user', user)
      return true
    } catch (e) {
      commit('setCredentialError', true)
      this.$storage.setUniversal('user', null)
      return false
    }
  },
  async logout ({ commit }) {
    this.$storage.setUniversal('user', null)
    return await this.$getRepository('members').call('logout')
  }
}

export const getters = {
  isAdmin: (state, getters, rootState) => {
    const user = rootState.storage ? rootState.storage.user : null
    return user instanceof Object && user.isAdmin
  },
  isLoggedIn: (state, getters, rootState) => {
    return rootState.storage && rootState.storage.user instanceof Object
  },
  hasPermission: (state, getters, rootState) => (permission) => {
    if (permission === null) { return false }
    const user = rootState.storage ? rootState.storage.user : null
    return !!(user && user.permissions && user.permissions[permission])
  },
  hasPermissions: (state, getters) => (permissions) => {
    return !permissions.some((permission) => {
      return !getters.hasPermission(permission)
    })
  }
}
