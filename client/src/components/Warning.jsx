import React from 'react'
import {Link} from "react-router-dom"

export const Warning = ({label,sublevel,to}) => {
  return (
    <div className='text-sm py-2'>{label} <Link to={to} className='underline'>{sublevel}</Link></div>
  )
}
