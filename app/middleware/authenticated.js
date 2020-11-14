export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.member.auth) {
    return redirect('/login')
  }
}
