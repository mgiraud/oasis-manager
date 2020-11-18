export default function ({ store, redirect }) {
  if (process.browser && !store.getters['security/isLoggedIn']) {
    return redirect({ name: 'login' })
  }
}
