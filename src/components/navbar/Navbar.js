import {
  CogIcon,
  InformationCircleIcon,
  RefreshIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'
const Header = ({
  setIsInfoModalOpen,
  setIsSettingsModalOpen,
}) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5 short:h-auto">
        <div className="flex">
         
  <RefreshIcon  className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => window.location.reload()}/>
        </div>
        <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="right-icons">
        <CogIcon
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
          <InformationCircleIcon
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
export default Header
