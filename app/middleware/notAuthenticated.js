export default function ({ store, redirect }) {
  if (store.getters['security/isLoggedIn']) {
    return redirect('/')
  }
}
