export const state = () => ({
  members: null,
  membersById: {}
})

export const mutations = {
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
    await $repository.$post('/login_check', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    const user = await $repository.$getOne('/me')
    this.$storage.setUniversal('user', user)
  },
  async logout ({ commit }, { $repository }) {
    this.$storage.setUniversal('user', null)
    await $repository.call('/logout')
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
