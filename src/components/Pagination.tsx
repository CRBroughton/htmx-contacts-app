export default function PaginationButton({ page }: { page:number }){
  return (
    <tr>
      <td colspan={5} style="text-align: center">
        <span
          hx-target="closest tr"
          hx-swap="outerHTML"
          hx-select="tbody > tr"
          hx-get={`/contacts?page=${page+1}`}
          hx-trigger="revealed">
                Loading More
        </span>
      </td>
    </tr>
  )
}