import { Middleware } from '@nuxt/types'

const isAdminMiddleWare: Middleware = ({ store, redirect }) => {
  if (!store.getters['security/isAdmin']) {
    return redirect({ name: 'login' })
  }
}

export default isAdminMiddleWare
