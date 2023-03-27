import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'
import {
  RefreshIcon,
} from '@heroicons/react/outline'



export const Alert = ({
  isOpen,
  message,
  variant = 'error',
  topMost = false,
}) => {
  const classes = classNames(
    'fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    {
      'bg-rose-500 text-white': variant === 'error',
      'bg-blue-500 text-white': variant === 'success',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="p-2" style={{padding: '1rem',display:'flex'}}>
          <p className="mr-3 text-center text-sm font-medium">{message}</p>
          <RefreshIcon  className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => window.location.reload()}/>
        </div>
      </div>
    </Transition>
  )
}
