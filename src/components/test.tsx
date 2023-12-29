import CustomButton from './button'

export default function test({ numbers }: { numbers: number[] }) {
  return (
    <div>
      <div class="bg-red-300 flex gap-2 p-2">
        {numbers.map((num) =>
          <div>
            <CustomButton num={num} />
          </div>
        )}
      </div>
    </div>
  )
}