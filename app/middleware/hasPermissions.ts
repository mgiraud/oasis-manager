import { Middleware } from '@nuxt/types'

const hasPermissionMiddleWare: Middleware = ({ store, redirect, route, from, $auth }) => {
  if (!$auth.loggedIn) {
    return redirect({ name: 'login' })
  }
  if (!route.meta) {
    return
  }
  let permissions = null
  for (const i in route.meta) {
    if (route.meta[i].permissions) {
      permissions = route.meta[i].permissions
    }
  }
  if (!permissions) {
    return
  }
  if (!store.getters['security/hasPermissions'](permissions)) {
    if (from && from.name) {
      redirect({ name: from.name, params: from.params })
    } else {
      redirect({ name: 'admin' })
    }
  }
}

export default hasPermissionMiddleWare
