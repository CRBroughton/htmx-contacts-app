export default function CustomButton({ num }: { num: number }) {
  return (
    <button
      hx-get={`/id/${num}`}
      hx-trigger="click"
      hx-target="closest div"
      hx-swap="outerHTML"
      class="bg-green-300 p-2 rounded-md">Number: {num}
    </button>
  )
}