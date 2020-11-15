export default function ({ store, redirect }) {
  if (store.state.member.auth) {
    return redirect('/')
  }
}
