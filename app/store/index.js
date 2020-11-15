const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = parsed.BEARER
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('member/setAuth', auth)
    this.$storage.syncUniversal('user', null)
    dispatch('permissions/loadPermissions')
  }
}
