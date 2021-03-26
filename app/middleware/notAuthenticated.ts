import { Middleware } from '@nuxt/types'

const notAuthenticatedMiddleWare: Middleware = ({ redirect, $auth }) => {
  if ($auth.loggedIn) {
    return redirect('/')
  }
}

export default notAuthenticatedMiddleWare
