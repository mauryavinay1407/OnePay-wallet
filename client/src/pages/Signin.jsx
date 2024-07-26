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

export const Signin = () => {
     const [loader,setLoader]=useState(false);
     const [username,setUsername]=useState("");
     const [password,setPassword]=useState("");
     const navigate=useNavigate();

  const handleSignin=async()=>{
    try {
        setLoader(true)
        if( !(username && password))
        return toast.error("Empty fields are not allowed")
        const response=await axios.post("api/v1/user/signin",{
          username,
          password
        });
        toast.success(response.data.msg);
        navigate("/dashboard")
    } catch (error) {
      toast.error("Signin failed")
      console.log("Error occured while signin",error)
    } finally{
      setLoader(false)
    }
  }


  return (
    <div className='h-screen bg-gradient-to-r from-slate-900 to-neutral-900 w-full flex justify-center items-center'>
       {loader? ( <Loader/> ):
      (
        <div className=' bg-white w-80 p-5 flex justify-center flex-col text-center rounded'>
           <Heading label="Sign In"/>
           <Instruction label={"Enter your credentials"}/>
           <InputBox onChange={(e)=>setUsername(e.target.value)} value={username} label={"Email"} placeholder={"doejohn@example.com"} />
           <InputBox onChange={(e)=>setPassword(e.target.value)} value={password} label={"Password"} placeholder={"********"}/>
           <ButtonBox onClick={handleSignin} label={"Sign In"} />
           <Warning label={"Don't have an account?"} sublevel={"Sign Up"} to={"/signup"}/>
        </div> 

      )}
    </div>
  )
}
