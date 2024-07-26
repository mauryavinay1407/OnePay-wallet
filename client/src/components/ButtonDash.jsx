import React from 'react'

export const ButtonDash = ({label,onClick}) => {
  return (
    <button type="button" className="px-3 py-2 m-3 text-xs font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={onClick}
     >{label}</button>
  )
}
