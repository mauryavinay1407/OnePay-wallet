import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Loader } from '../components/Loader'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom'

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleMoneyTransfer = async () => {
    try {
      if (!amount) return toast.error("Enter the amount first")
      setLoader(true);
      const response = await axios.post("api/v1/account/transfer", {
        amount,
        toUser: id
      })
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log("Transaction failed error", error)
      toast.error("Transaction failed!")
      setLoader(false)
    } finally {
    }
  }

  return (
    <>
      {loader ? (<Loader />) : (
        <div className='w-full h-screen flex justify-center items-center'>
          <div className='h-auto w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-4 bg-gray-100'>
            <div className='flex justify-end w-full text-gray-900 text-3xl cursor-pointer'>
              <RxCross1 onClick={() => navigate("/dashboard")} />
            </div>
            <Heading label={"Send Money"} styles={{ textAlign: "center", margin: "10px" }} />
            <div className='text-gray-800 flex flex-col items-center space-y-1 font-medium text-lg mt-8'>
              <div className='h-16 w-16 bg-slate-500 border-2 border-dotted border-rose-950 rounded-full flex justify-center items-center'>
                <div className='h-14 w-14 flex justify-center items-center rounded-full' style={{ backgroundColor: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})` }}>
                  <span className='text-gray-100 text-5xl mb-3'>
                    {name[0]}
                  </span>
                </div>
              </div>
              <span className='underline underline-offset-8 font-medium text-2xl'>{name}</span>
            </div>
            <label className='font-medium'>Amount (in $USD)</label>
            <input type='text' onChange={(e) => setAmount(e.target.value)} className='w-full rounded mt-1 p-1 border-2 border-gray-300' value={amount} placeholder='Enter Amount' />
            <button
              onClick={handleMoneyTransfer}
              type='button' className='text-white bg-indigo-900 hover:bg-indigo-600 font-medium rounded-lg text-sm w-full px-5 py-1.5 me-2 mb-2 mt-4'>Pay Now</button>
          </div>
        </div>
      )}
    </>
  )
}
