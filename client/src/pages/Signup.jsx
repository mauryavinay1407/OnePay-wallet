import React, { useState } from 'react'
import {Heading} from '../components/Heading'
import { Instruction } from '../components/Instruction'
import { InputBox } from '../components/InputBox'
import { ButtonBox } from '../components/ButtonBox'
import { Warning } from '../components/Warning'
import {Loader} from "../components/Loader"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Signup = () => {
     const [firstname,setFirstname]=useState("");
     const [lastname,setLastname]=useState("");
     const [username,setUsername]=useState("");
     const [password,setPassword]=useState("");
     const [loader,setLoader]=useState(false);
     const navigate=useNavigate();
    
  const handleSignup=async()=>{
    try {
      setLoader(true)
      if( ! (firstname && lastname && username && password))
      return toast.error("Empty fields are not allowed")
      const response=await axios.post('api/v1/user/signup',{
        username,
        firstname,
        lastname,
        password
      });
      toast.success(response.data.msg)
      navigate("/dashboard")
    } catch (error) {
      toast.error("Signup failed!!!")
      console.log("Error occured while signup",error)
    } finally{
      setLoader(false)
    }
  }

  return (
         <div className='h-screen bg-gradient-to-r from-slate-900 to-neutral-900 w-full flex justify-center items-center'>
    {loader? ( <Loader/> ):
      (
        <div className=' bg-white w-80 p-5 flex justify-center flex-col text-center rounded'>
        <Heading label="Sign up"/>
        <Instruction label="Sign up and start transaction"></Instruction>
        <InputBox onChange={(e)=>{
           setFirstname(e.target.value);
        }} label="First Name" placeholder="John" value={firstname} />
        <InputBox onChange={(e)=>{
          setLastname(e.target.value);
        }} label="Last Name" placeholder="Doe" value={lastname}/>
        <InputBox onChange={(e)=>{
          setUsername(e.target.value);
        }} label="Email" placeholder="doejohn@example.com" value={username} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value)
        }} label="Password" placeholder="*********" value={password}/>
           
        <ButtonBox 
        onClick={handleSignup} 
        label="Sign Up" />
       
        <Warning label="Already have an account?" sublevel="Signin" to="/signin"/>
    </div>
      )
    }
         </div> 
  )
}

