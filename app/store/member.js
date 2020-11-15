export const state = () => ({
  auth: false,
  members: null,
  membersById: {}
})

export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  setUser (state, user) {
    state.user = user
  },
  setMembers (state, members) {
    state.members = members
    if (!members) { return }
    const membersById = {}
    members.forEach((member) => {
      membersById[member.id] = member
    })
    state.memberByIds = membersById
  }
}
export const actions = {
  async login ({ commit }, { credentials, $repository }) {
    const response = await $repository.$post('/login_check', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    commit('setAuth', response === 'ok')
    const user = await $repository.$getOne('/me')
    this.$storage.setUniversal('user', user)
  },
  async logout ({ commit }, { $repository }) {
    await $repository.call('/logout')
    commit('setAuth', false)
    this.$storage.setUniversal('user', null)
  },
  async getMembers ({ commit }, { $repository }) {
    const members = await $repository.$get('/members')
    commit('setMembers', members)
  }
}

export const getters = {
  getRoles: (state, getters, rootState) => {
    const user = rootState.storage.user
    return user ? user.roles : null
  },
  getMember: state => id => state.memberByIds[id] ? state.memberByIds[id] : null
}
