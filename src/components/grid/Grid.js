import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow.js'
import { CurrentRow } from './CurrentRow.js'
import { EmptyRow } from './EmptyRow.js'



export const Grid = ({
  solution,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
}) => {
  const empties =
    guesses.length < MAX_CHALLENGES() - 1
      ? Array.from(Array(MAX_CHALLENGES() - 1 - guesses.length))
      : []

  return (
    <>
      {guesses && guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {guesses.length < MAX_CHALLENGES() && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}
