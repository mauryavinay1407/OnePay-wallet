import { useState } from 'react'
import { BrowserRouter,
         Routes,
         Route
} from 'react-router-dom'
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Dashboard} from "./pages/Dashboard"
import {SendMoney} from "./pages/SendMoney"
import { Header } from './components/Header'
import { Home } from './components/Home'



function App() {
  return (
    <div className='min-h-screen bg-gradient-to-r from-slate-900 to-neutral-900'>
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/send' element={<SendMoney />}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
