import { Middleware } from '@nuxt/types'

const authenticatedMiddleWare: Middleware = ({ $auth, redirect }) => {
  if (!$auth.loggedIn) {
    return redirect({ name: 'login' })
  }
}

export default authenticatedMiddleWare
