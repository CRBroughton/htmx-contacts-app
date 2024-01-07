export default function AddContact() {
  return (
    <p>
      <a href="/contacts/new">Add Contact</a>
      <span hx-get="/contacts/count" hx-trigger="revealed">
        <img width={25} id="spinner" class="htmx-indicator" src="public/spinner.svg" />
      </span>
    </p>
  )
}