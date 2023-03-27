import { default as GraphemeSplitter } from 'grapheme-splitter'
import { useEffect, useState } from 'react'
import { AlertContainer } from './components/alerts/AlertContainer'
import { Grid } from './components/grid/Grid'
import Keyboard from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import SettingsModal from './components/modals/SettingsModal.js'
import Header from './components/navbar/Navbar.js'
import {
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
} from './constants/settings'
import {
  CORRECT_WORD_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WIN_MESSAGES,
  WORD_NOT_FOUND_MESSAGE,
} from './constants/strings'
import { useAlert } from './context/AlertContext'
import {
  findFirstUnusedReveal,
  isWinningWord,
  isWordInWordList,
  fn,
  unicodeLength
} from './lib/words'
import './App.css'


function App() {
  const {solution} = fn();
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(true)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )
  

  // gets executed when the user selects the hard mode option
  const handleHardMode = (isHard) => {
    console.log('isHard: ', isHard);
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
      // Users cannot switch to hard mode mid-game.
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE)
    }
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  //show a success alert message and reload the page if the game is won
  useEffect(() => {
    if (isGameWon) {
      const winMessage = WIN_MESSAGES
      const delayMs = REVEAL_TIME_MS * solution.length
      showSuccessAlert(winMessage, {
        delayMs
      })

      setTimeout(()=>{
        window.location.reload();
      },delayMs+300000)
   
    }
  }, [isGameWon, isGameLost, showSuccessAlert,solution])

  // called whenever the user enters a character while playing the game
  const onChar = (value) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solution.length &&
      guesses.length < MAX_CHALLENGES() &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  // removing the last character
  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === solution.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess,isHardMode)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.length)

    const winningWord = isWinningWord(currentGuess)
    console.log('winningWord: ', winningWord);
    console.log('solution: ', solution);
    if (
      unicodeLength(currentGuess) === solution.length &&
      
      guesses.length < MAX_CHALLENGES() &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
 
        return setIsGameWon(true)
      }
      // else if the guess time reach the max limit
      if (guesses.length === MAX_CHALLENGES() - 1) {

        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solution.length + 1,
        })
      }
    }
  }

  return (
    <div className='container-wrapper'>
      <div className="flex h-full flex-col">
        <Header
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
        />
        <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
          <div className="flex grow flex-col justify-center pb-6 short:pb-2">
            <Grid
              solution={solution}
              guesses={guesses}
              currentGuess={currentGuess}
              isRevealing={isRevealing}
              currentRowClassName={currentRowClass}
            />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            solution={solution}
            guesses={guesses}
            isRevealing={isRevealing}
          />
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isHardMode={isHardMode}
            handleHardMode={handleHardMode}
          />
          <AlertContainer />
        </div>
      </div>
    </div>
  )
}

export default App
