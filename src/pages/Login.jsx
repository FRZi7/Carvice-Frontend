import axios from 'axios'
import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { toast } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import userSlice from './redux/userSlice'
import { addUsers } from "./redux/userSlice"


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logindata, setLogindata] = useState({email:"",password:""})
  const onSubmit =async(e)=>{
    try {
      e.preventDefault()
      const response = await axios.post("http://localhost:1102/api/user/login",logindata)
      if(response.data.success){
        toast.success("login success")
        localStorage.setItem("token",response.data.data)
        dispatch(addUsers(response.data.user))
        navigate("/")
      }else{
        response
        .status(400)
        .send({message:response.data.message, success:false})
          toast.error("Wrong credentials ")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }

  }
  return (
    <div>
         <div className="flex items-center  justify-center h-screen bg-center ob" style={{ backgroundImage: 'url("/img/logo-color-modified.png")' }}>
      <div className="bg-slate-400 shadow-lg rounded-2xl px-8 py-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded-md px-3 py-2" onChange={(e)=>{setLogindata({...logindata,email:e.target.value})}} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">Password</label> 
            <input type="password" id="password" className="w-full border border-gray-300 rounded-md px-3 py-2" onChange={(e)=>{setLogindata({...logindata,password:e.target.value})}}/>
          </div>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md require:password">Login</button>
          <div className='register text-center mt-5 text-red-700' >
            <h4><a href='/userregister'>Not a user? register here</a></h4>
            <h4><a href='/userregister'>Forgot password?</a></h4>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login