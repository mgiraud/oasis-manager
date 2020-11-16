export const state = () => ({
  members: null,
  membersById: {},
  error: ''
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
  async getMembers ({ commit }, { repository }) {
    return await repository.$get('/members')
  }
}

export const getters = {
  getRoles: (state, getters, rootState) => {
    const user = rootState.storage.user
    return user ? user.roles : null
  },
  getMember: state => id => state.memberByIds[id] ? state.memberByIds[id] : null
}
