import { Middleware } from '@nuxt/types'

const notAuthenticatedMiddleWare: Middleware = ({ redirect, $auth }) => {
  if ($auth.loggedIn.value) {
    return redirect('/')
  }
}

export default notAuthenticatedMiddleWare
