import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration(){
  const [registerdata, setRegisterdata] = useState({name:"",email:"",password:"",phone:"",cpassword:""})
  const navigate = useNavigate()
  const onSubmit = async(e)=>{
      try {
        e.preventDefault()
        console.log(registerdata)
        const response = await axios.post("http://localhost:1102/api/user/register",registerdata)
      
      if(response.data.success){
        toast.success(response.data.message)
        navigate("/login")
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
    }
  return (
      <div>
        <div>
         <div className="flex items-center  justify-center h-screen  bg-center ob" style={{ backgroundImage: 'url("/img/logo-color-modified.png")' }}>
      <div className="bg-slate-400 shadow-lg rounded-2xl px-8 py-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        <form onSubmit={onSubmit}> 
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Name</label>
            <input type="name"  placeholder="enter your name" id="name" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={(e)=>{setRegisterdata({...registerdata,name:e.target.value})}} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label> 
            <input type="email" placeholder="enter your email" id="email" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={(e)=>{setRegisterdata({...registerdata,email:e.target.value})}}/>
          </div>
          <div className="mb-4">
            <label htmlFor="phone number" className="block font-medium mb-2">Mobile Number</label>
            <input type="number" placeholder="enter your number" id="mobilenumber" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={(e)=>{setRegisterdata({...registerdata,phone:e.target.value})}}/>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">Password</label>
            <input type="passowrd" placeholder="enter your password" id="password" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={(e)=>{setRegisterdata({...registerdata,password:e.target.value})}} />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm password" className="block font-medium mb-2">Confirm Password</label> 
            <input type="password"  placeholder="confirm password" id="cpassword" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={(e)=>{setRegisterdata({...registerdata,cpassword:e.target.value})}}/>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md  text-center content-center ml-28   ">Register</button>
          <div className='alreadyuser text-center text-red-700 mt-2' >
            <h4><a href='/login'>Already a user ? Sign in</a></h4>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Registration