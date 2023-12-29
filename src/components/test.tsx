import { Vector } from '../index'

export default function test({ vectors }: { vectors: Vector[] }) {
  return (
    <div>
      <h1>About me!</h1>
      {vectors.map((vector) => <p>{vector.x} - {vector.y}</p>)}
    </div>
  )
}