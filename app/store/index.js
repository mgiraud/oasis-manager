const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req }) {
    // Load permissions list from file
    dispatch('security/loadPermissions')
    // check if the user exists
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        const token = parsed.BEARER
      } catch (err) {
        // No valid cookie found
      }
    }
    this.$storage.syncUniversal('user', null)
  }
}
