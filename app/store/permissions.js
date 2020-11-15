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
  }
}
