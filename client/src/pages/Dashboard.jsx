import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Heading } from '../components/Heading'
import { ButtonDash } from '../components/ButtonDash'
import { Popup } from '../components/Popup'
import { InputBox } from '../components/InputBox'
import { Users } from '../components/Users'

export const Dashboard = () => {
  const [balance,setBalance]=useState("");
  const [name,setName]=useState("")
  const [user,setUser]=useState({})
  const [popup,setPopup]=useState(false);

  const navigate=useNavigate();

   const handleLogout=async()=>{
     console.log("start")
     const response=await axios.get("/api/v1/user/logout");
     console.log("end")
     toast.success(response.data.msg);
     navigate("/signin");
   }

  useEffect(()=>{
    const fetchData=async()=>{
      const response=await axios.get("api/v1/account/balance")
      setBalance(response.data.balance.toFixed(2));
      setName(response.data.user.firstname);
      setUser(response.data.user)
    }
    fetchData();
  },[])
  return (
    <>
    {popup? (<Popup user={user} setpopup={setPopup}/>) : (
      <div>

        <div className='flex justify-between items-center p-5'>
        <Heading label={`Current Balance: $${balance}`} styles={{ color: 'white',fontSize:'1.5rem' }}  />
        <div>
        <div className='text-gray-200 font-medium text-lg mr-10'>
            Hey, {name} <button className='h-8 w-8 ml-3 rounded-full bg-gray-500'>{ name[0]}</button>
        </div>
            <ButtonDash label={"Logout"} onClick={handleLogout}/>
            <ButtonDash label={"Edit profile"} onClick={(e)=>{
              setPopup(true);
             } } />
        </div>    
     </div>
      <Heading label={"Users"} styles={{ color: 'white',fontSize:'1.5rem',marginLeft:'4rem'}}/>
      <div className='w-full flex flex-col items-center'>
        
        <Users />
      </div>


      </div>
    )}
   

    </>
  )
}
