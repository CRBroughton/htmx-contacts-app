export default function PaginationButton({ page }: { page:number }){
  return (
    <tr>
      <td colspan={5} style="text-align: center">
        <button
          hx-target="closest tr"
          hx-swap="outerHTML"
          hx-select="tbody > tr"
          hx-get={`/contacts?page=${page+1}`}>
                Load More
        </button>
      </td>
    </tr>
  )
}