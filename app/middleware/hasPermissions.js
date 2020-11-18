export default function ({ store, route, redirect, from }) {
  if (!process.browser) {
    return
  }
  if (!store.getters['security/isLoggedIn']) {
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
    if (from) {
      redirect({ name: from.name, params: from.params })
    } else {
      redirect({ name: 'admin' })
    }
  }
}
