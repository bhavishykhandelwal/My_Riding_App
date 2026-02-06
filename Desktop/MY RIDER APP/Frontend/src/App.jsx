import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'


function App() {
  return (
  //  <div className="min-h-screen flex items-center justify-center bg-gray-900">
  //     {/* <h1 className="text-4xl font-bold text-white">
  //       Tailwind is working 🚀
  //     </h1> */}


  //   </div>
  <div>
      <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<UserLogin />} />
            <Route path='/signup' element={<UserSignup />} />
            <Route path='/captain-login' element={<Captainlogin />} />
            <Route path='/captain-signup' element={<CaptainSignup />} />

      </Routes>
  </div>
  )
}

export default App


