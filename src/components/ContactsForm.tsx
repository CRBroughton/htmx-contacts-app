export default function ContactsForm({ input }: { input: string }) {
  return (
    <form action="/contacts" method="get" class="tool-bar">
      <label for="search">Search Term</label>
      <input id="search" type="search" name="q" value={input}/>
      <input type="submit" value="Search"/>
    </form>
  )
}