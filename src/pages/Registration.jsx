import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axios';

function Registration(){
  const [registerdata, setRegisterdata] = useState({name:"",email:"",password : "",phone:""})
  const [isSubmit,SetIsSubmit] = useState(false)
  const [message, setMessage] = useState("")
  const [phonemessage, setPhoneMessage] = useState("")
  const [valid, setValid] = useState(false)
  const navigate = useNavigate()

  console.log(registerdata,"the regustered data")

  const validationphone = (phone) =>{
    console.log(phone,"ioio")
    const regex = /^\d{10}$/;
    if(!regex.test(phone)){
      
      setPhoneMessage("Phone must be 10 digits")
      setValid(false)
    }else if(regex.test(phone)){
      console.log("good to go")
      setPhoneMessage("Phone is valid✔️ ")
      setValid(true)
      SetIsSubmit(true)
    }
  }
  const validation = (password) =>{
    console.log(password,"ioio")
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if(!regex.test(password)){
      setMessage("Password is not strong")
      setValid(false)
    }else if(regex.test(password)){
      console.log("good to go")
      setMessage("Password is valid ✔️")
      setValid(true)
      SetIsSubmit(true)
    }
    else{
      setMessage("Password is Invalid")
      setValid(false)
    }
  }
  
  const handlePassword =(e)=>{
    setValid(validation(e.target.value))
    {setRegisterdata({...registerdata,password:e.target.value})}
  }
  const handlePhone =(e)=>{
    setValid(validationphone(e.target.value))
    {setRegisterdata({...registerdata,phone:e.target.value})}
  }

  const onSubmit = async(e)=>{
      try {
        e.preventDefault()
        const response = await axios.post("/api/user/register",registerdata)
      if(response.data.success && isSubmit === true){
        toast.success(response.data.message)
        navigate("/otp")
      }else{
        toast.error("Invalid password or email")  
      }
    } catch (error) {
      toast.error("Please validate your credentials")
    }
}

    useEffect(() => {
    }, [validation])
    
  return (
      <div>
        <div>
         <div className="flex items-center  justify-center h-screen  bg-center ob" style={{ backgroundImage: 'url("/img/logo-color-modified.png")' }}>
      <div className="bg-slate-400 shadow-lg rounded-2xl px-8 py-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        <form onSubmit={onSubmit}> 
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Name</label>
            <input type="name"  placeholder="enter your name" name='name' id="name" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={(e)=>{setRegisterdata({...registerdata,name:e.target.value})}} required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label> 
            <input type="email" placeholder="enter your email" name='email' id="email" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={(e)=>{setRegisterdata({...registerdata,email:e.target.value})}} required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone number" className="block font-medium mb-2">Mobile Number</label>
            <input type="number" placeholder="enter your number" name='mobilenumber' id="mobilenumber" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={handlePhone} required/>
            <p style={{ color: valid ? '' : 'Green' }}>{ valid ? ""  :phonemessage }</p>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">Password</label>
            <input type="password" placeholder="enter your password" name='password' id="password" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={handlePassword} required />
          <p style={{ color: valid ? '' : 'Green' }}>{valid ? "" :  message }</p>
          </div> 
          {/* <div className="mb-4">
            <label htmlFor="confirm password" className="block font-medium mb-2">Confirm Password</label> 
            <input type="password"  placeholder="confirm password" name='cpassword' id="cpassword" className="w-full border border-gray-300 rounded-md px-3 py-2 required" onChange={(e)=>{setRegisterdata({...registerdata,cpassword:e.target.value})}}/>
          </div> */}
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