import { useState } from 'react'
import Home from "../src/pages/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Bookcarwash from './pages/bookcarwash'
import Success from './pages/Success'
import Bookmechanic from './pages/Bookmechanic'


function App() {
  return (

   <BrowserRouter>
   <Toaster position="top-center" reverseOrder={false}/>
   <Routes>
    <Route path='/' element={<Home/>}/>  
    <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
    <Route path="/userregister" element={<PublicRoute><Registration/></PublicRoute>}/>
    <Route path="/bookcarwash" element={<ProtectedRoute><Bookcarwash/></ProtectedRoute>}/>
    <Route path='/mechanic' element={<ProtectedRoute><Bookmechanic/></ProtectedRoute>}/>
    <Route path='/success' element={<Success/>}/>

   </Routes>
   </BrowserRouter>

  )
}

export default App
