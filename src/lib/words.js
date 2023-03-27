import { VALID_GUESSES as HARDVALID_GUESSES } from '../constants/hardValidGuess';
import { WORDS as HARDWORDS } from '../constants/hardwordlist';
import { VALID_GUESSES } from '../constants/validGuesses';
import { WORDS } from '../constants/wordlist';
import { default as GraphemeSplitter } from 'grapheme-splitter';

export const firstGameDate = new Date(2022, 0);
export const periodInDays = 1;

export const isWordInWordList = (word, isHard) => {
  if (isHard) {
    return (
      HARDWORDS.includes(localeAwareLowerCase(word)) ||
      HARDVALID_GUESSES.includes(localeAwareLowerCase(word))
    );
  }
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  );
};

export const isWinningWord = (word) => {
  const { solution } = getSolution();
  return solution === word;
};

export const findFirstUnusedReveal = (word, guesses) => {
  if (guesses.length === 0) {
    return false;
  }
  const lettersLeftArray = [];
  const splitWord = unicodeSplit(word);
  let n;
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter);
    if (n !== -1) {
      lettersLeftArray.splice(n, 1);
    }
  }

  return false;
};

export const unicodeSplit = (word) => {
  return new GraphemeSplitter().splitGraphemes(word);
};

export const unicodeLength = (word) => {
  return unicodeSplit(word).length;
};

export const localeAwareLowerCase = (text) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase();
};

export const localeAwareUpperCase = (text) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase();
};

const wordTree = {};
export const getWordOfDay = (isHard = false) => {
  const list = isHard ? HARDWORDS : WORDS;
  let code;
  if (isHard) {
    if (wordTree[1]) {
      code = wordTree[1];
    } else {
      code = list[Math.floor(Math.random() * list.length)];
      wordTree[1] = code;
    }
  } else {
    if (wordTree[2]) {
      code = wordTree[2];
    } else {
      code = list[Math.floor(Math.random() * list.length)];
      wordTree[2] = code;
    }
  }
  return localeAwareUpperCase(code);
};

export const getSolution = () => {
  const wordOfTheDay = getWordOfDay(
    localStorage.getItem('gameMode') === 'hard'
  );
  return {
    solution: wordOfTheDay,
  };
};

export const fn = () => {
  const { solution } = getSolution();
  return { solution };
};
