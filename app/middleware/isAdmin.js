export default function ({ store, redirect }) {
  if (!store.getters['permission/isAdmin']) {
    return redirect('/login')
  }
}
