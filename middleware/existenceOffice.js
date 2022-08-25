export default ({ redirect, store }) => {
  if (store.state.office) {
    return redirect('/specialists/office/appointments?page=1')
  }
}
