export default function ({ store, redirect }) {
  if (!store.getters['security/isAdmin']) {
    return redirect({ name: 'login' })
  }
}
