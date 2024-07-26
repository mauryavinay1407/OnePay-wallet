import React from 'react'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import {useTypewriter,Cursor} from 'react-simple-typewriter';


export const Home = () => {
  
   
    const navigate=useNavigate();

  return (
    <div className='flex flex-col items-center mt-40'>
        <h1 className='text-4xl font-bold text-gray-300'>Simplify your payments with <span className='italic text-5xl'>One<span className='text-red-600'>Pay</span> </span></h1>
        <div className='text-gray-300 text-4xl font-semibold'>It is <span className='font-bold text-6xl text-red-600 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>
      <Typewriter
      options={{
        autoStart:true,
        loop:true,
        delay:40,
        deleteSpeed:20,
        strings:[
        "Secure","Seamless","Efficient","User-friendly","Reliable","Flexible"],
      }}
      >
      </Typewriter>  
          </span>
          <span className='text-6xl'><Cursor cursorColor='red'  /></span> 
          </div>
        <div className='mt-5 text-gray-300'>
        Streamline your payment process and grow your business effortlessly
        </div>
        <div className='mt-10' onClick={(e)=>navigate("/signin")}>
        <a href="" className="relative inline-flex items-center px-10 py-1.5 overflow-hidden text-lg font-medium bg-gray-400 text-white-600  rounded-full hover:text-white group hover:bg-gray-50">
<span className="absolute left-0 block w-full h-0 transition-all bg-gray-800 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
<span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="relative">Get started</span>
</a>
        </div>
    </div>
  )
}
