import { Middleware } from '@nuxt/types'

const authenticatedMiddleWare: Middleware = ({ store, redirect }) => {
  if (!store.getters['security/isLoggedIn']) {
    return redirect({ name: 'login' })
  }
}

export default authenticatedMiddleWare
