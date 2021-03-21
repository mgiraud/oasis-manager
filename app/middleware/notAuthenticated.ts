import { Middleware } from '@nuxt/types'

const notAuthenticatedMiddleWare: Middleware = ({ store, redirect }) => {
  if (store.getters['security/isLoggedIn']) {
    return redirect('/')
  }
}

export default notAuthenticatedMiddleWare
