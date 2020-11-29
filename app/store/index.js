import jwtDecode from 'jwt-decode'
const cookieparser = process.server ? require('cookieparser') : undefined

export const strict = process.env.NODE_ENV === 'prod'

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req, app }) {
    // Load permissions list from file
    dispatch('security/loadPermissions')
    // Load page categories for menu rendering
    await dispatch('page/fetchAll')
    // check if the user exists
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      if (!parsed || !parsed.BEARER) {
        return await dispatch('security/logout')
      } else {
        const decodedToken = jwtDecode(parsed.BEARER)
        if (!decodedToken || decodedToken.exp < (Date.now() / 1000)) {
          return await dispatch('security/logout')
        } else {
          this.$storage.syncUniversal('user', null)
        }
      }
    } else {
      return await dispatch('security/logout')
    }
  }
}
