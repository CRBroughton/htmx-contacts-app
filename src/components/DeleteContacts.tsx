export default function DeleteContacts() {
  return (
    <button
      hx-delete="/contacts"
      hx-confirm="Are you sure you want to delete these contacts?"
      hx-target="body"
    >
        Delete Selected Contacts
    </button>
  )
}