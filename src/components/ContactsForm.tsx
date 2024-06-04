export default function ContactsForm({ input }: { input: string }) {
  return (
    <form action="/contacts" method="get" class="flex gap-2 items-center mt-4">
      <input
        class="p-2"
        id="search"
        placeholder="Search..."
        type="search"
        name="q"
        value={input}
        hx-get="/contacts"
        hx-trigger="change, keyup delay:200ms changed"
        hx-target="tbody"
        hx-select="tbody tr"
        hx-push-url="true"
        hx-indicator="#spinner"
      />
      <img width={25} id="spinner" class="htmx-indicator" src="public/spinner.svg" alt="Request In Flight..."/>
    </form>
  )
}