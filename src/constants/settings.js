import { enUS } from 'date-fns/locale'

let MAX_CHALLENGESFn = () => {
  let isHard = localStorage.getItem('gameMode') === 'hard'
  if (isHard) {
    return 5
  }
  return 6
}
let LENGTH = 5;
setInterval(()=>{
    LENGTH = MAX_CHALLENGESFn()
},500)

    
export const MAX_CHALLENGES = () => {
    return LENGTH
};
export const ALERT_TIME_MS = 20000
export const LONG_ALERT_TIME_MS = 10000
export const REVEAL_TIME_MS = 500
export const WELCOME_INFO_MODAL_MS = 350
export const DATE_LOCALE = enUS
