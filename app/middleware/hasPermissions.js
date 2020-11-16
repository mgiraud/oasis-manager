export default function ({ store, route, redirect, from }) {
  if (!store.getters['permission/isLoggedIn']) {
    return redirect('/login')
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
  if (!store.getters['permission/hasPermissions'](permissions)) {
    if (from) {
      redirect({ name: from.name, params: from.params })
    } else {
      redirect({ name: 'admin' })
    }
  }
}
