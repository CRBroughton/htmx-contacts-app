export default function ContactsForm({ input }: { input: string }) {
  return (
    <form action="/contacts" method="get" class="flex gap-2 items-center">
      <label for="search">Search Term</label>
      <input class="p-2" id="search" type="search" name="q" value={input}/>
      <input class="bg-slate-300 p-2 rounded" type="submit" value="Search"/>
    </form>
  )
}