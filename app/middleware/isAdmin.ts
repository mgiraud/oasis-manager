import { Middleware } from '@nuxt/types'

const isAdminMiddleWare: Middleware = ({ store, redirect, $auth }) => {
  if (!$auth.isAdmin) {
    return redirect({ name: 'login' })
  }
}

export default isAdminMiddleWare
