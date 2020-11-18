const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req }) {
    // Load permissions list from file
    dispatch('security/loadPermissions')
    // check if the user exists
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      if (!parsed || !parsed.BEARER) {
        dispatch('security/logout')
      } else {
        this.$storage.syncUniversal('user', null)
      }
    } else {
      dispatch('security/logout')
    }
  }
}
