export default function ({ store, redirect }) {
  if (store.getters['permission/isLoggedIn']) {
    return redirect('/')
  }
}
