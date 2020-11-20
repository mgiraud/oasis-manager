const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    // Load permissions list from file
    dispatch('security/loadPermissions')
    // Load page categories for menu rendering
    await dispatch('page/fetchAll')
    // check if the user exists
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      if (!parsed || !parsed.BEARER) {
        dispatch('security/logout')
      } else {
        this.$storage.syncUniversal('user', null)
      }
    } else {
      await dispatch('security/logout')
    }
  }
}
