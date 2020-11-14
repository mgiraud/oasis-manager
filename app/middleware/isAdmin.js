export default function ({ store, redirect }) {
  if (!store.getters['member/isAdmin']) {
    return redirect('/')
  }
}
