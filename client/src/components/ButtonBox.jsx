import React from 'react'

export const ButtonBox = ({label,onClick,styles}) => {
  return (
    <button type="button" style={styles} className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-1.5 me-2 mb-2 mt-4  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={onClick}>{label}</button>
  )
}
