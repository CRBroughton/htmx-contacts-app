export default function AddContact() {
  return (
    <>
      <button
        hx-get="/contacts/new"
        hx-target="#form-table"
      >
        Add Contact
      </button>
    </>
  )
}