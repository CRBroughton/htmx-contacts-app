import { Vector } from '../index'

export default function test({ vectors }: { vectors: Vector[] }) {
  return (
    <div class="bg-red-300">
      <h1>About me!</h1>
      {vectors.map((vector) => <p>{vector.x} - {vector.y}</p>)}
    </div>
  )
}