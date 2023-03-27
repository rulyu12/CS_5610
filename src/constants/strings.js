export const GAME_TITLE = process.env.REACT_APP_GAME_NAME

export const WIN_MESSAGES = 'Congratulations!  Would you like to try again?'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Too Short'
export const WORD_NOT_FOUND_MESSAGE = 'Word Not Found'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode'
export const HARD_MODE_DESCRIPTION =
  'Hard Mode'

export const CORRECT_WORD_MESSAGE = (solution) =>()=>{
  return `You Lost! Answer is ${solution}`
}
export const ENTER_TEXT = 'ENTER'
export const DELETE_TEXT = 'DELETE'
