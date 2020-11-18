export default function ({ store, redirect }) {
  if (process.browser && !store.getters['security/isAdmin']) {
    return redirect({ name: 'login' })
  }
}
