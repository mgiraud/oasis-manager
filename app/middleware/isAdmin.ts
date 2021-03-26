import { Middleware } from '@nuxt/types'

const isAdminMiddleWare: Middleware = ({ redirect, $auth }) => {
  if (!$auth.isAdmin) {
    return redirect({ name: 'login' })
  }
}

export default isAdminMiddleWare
