import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

// router 
import UserRouter from './routers/user/UserRouter'
import OwnerRouter from './routers/owner/OwnerRouter'
import AdminRouter from './routers/admin/AdminRouter'

// router 
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// firebase push notification
import Notification from './firebase/Notification';


function App() {

  return (
    <>
      <Toaster  />
      <Notification/>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRouter />}></Route>
          <Route path='/owner/*' element={<OwnerRouter />}></Route>
          <Route path='/admin/*' element={<AdminRouter />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}



export default App
