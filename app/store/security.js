const fs = process.server ? require('fs') : null
const path = process.server ? require('path') : null

export const state = () => ({
  permissions: []
})

export const mutations = {
  setPermissions (state, permissions) {
    state.permissions = permissions
  }
}

export const actions = {
  loadPermissions ({ commit }) {
    fs.readFile(path.resolve('app/security/permissions.json'), 'utf8', (err, data) => {
      if (err) { throw err }
      commit('setPermissions', JSON.parse(data))
    })
  },
  async login ({ commit }, { credentials, repository }) {
    await repository.$post('/login_check', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    const user = await repository.$getOne('/me')
    this.$storage.setUniversal('user', user)
  },
  async logout ({ commit }, { repository }) {
    this.$storage.setUniversal('user', null)
    await repository.call('/logout')
  }
}

export const getters = {
  isAdmin: (state, getters, rootState) => {
    const user = rootState.storage.user
    return user instanceof Object && user.isAdmin
  },
  isLoggedIn: (state, getters, rootState) => {
    return rootState.storage.user instanceof Object
  },
  hasPermission: (state, getters, rootState) => (permission) => {
    if (permission === null) { return false }
    const user = rootState.storage.user
    return !!(user && user.permissions && user.permissions[permission])
  },
  hasPermissions: (state, getters) => (permissions) => {
    return !permissions.some((permission) => {
      return !getters.hasPermission(permission)
    })
  }
}
