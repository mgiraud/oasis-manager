import { Middleware } from '@nuxt/types'

const isAdminMiddleWare: Middleware = ({ redirect, $auth }) => {
  if (!$auth.isAdmin.value) {
    return redirect({ name: 'login' })
  }
}

export default isAdminMiddleWare
