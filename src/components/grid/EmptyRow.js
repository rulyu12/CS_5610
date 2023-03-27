import { fn } from '../../lib/words'
import Cell from './Cell.js'




export const EmptyRow = () => {
  const {solution} = fn()

  const emptyCells = Array.from(Array(solution.length))

  return (
    <div className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
