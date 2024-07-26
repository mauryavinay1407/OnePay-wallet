import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate=useNavigate();

  return (
   <nav className='w-full h-20 flex items-center justify-between bg-gradient-to-r from-slate-300 to-neutral-900'>
    <h1 className='text-4xl font-bold italic pl-5 cursor-pointer' onClick={()=>navigate('/')}>One<span className='text-red-600'>Pay</span> </h1>
   </nav>
  )
}
