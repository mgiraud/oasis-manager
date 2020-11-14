export default function ({ store, redirect }) {
  console.log(store.getters['member/isAdmin'])
  if (!store.getters['member/isAdmin']) {
    return redirect('/')
  }
}
