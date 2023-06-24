import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Success from './Success'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'

function Bookcarwash() {
    const navigate = useNavigate()
    const [bookCarwash, setBookcarwash] = useState({name:"",numberplate:"",number:"",address:"",pickup:"", service:""})
    const onSubmit = async(e)=>{
    try {
        e.preventDefault()
        const response = await axios.post("http://localhost:1102/api/user/service",bookCarwash)
        console.log(response,"sadasdasd")
        if(response.data.success){
            toast.success("booking successful")
            navigate("/success")
        }else{
        toast.error("booking unsuccessful")    
        }
    } catch (error) {
        console.log(error,"error in booking")
        toast.error("something went wrong")
    }
}
  return (
      <div className='bookingcarname  '>
    <Navbar/>
    <div className="relative">
        <img src="\img\maxresdefault.jpg" className="imgg w-screen h-80 object-cover" alt="LOGO" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h1 className="text-white text-7xl font-bold font-serif">CARWASH BOOKING</h1>
        </div>
    </div>
    <div className='bookcarwash  rounded-2xl m-20  border-4 border-sky-500 p-20 bg-slate-200' >
    <form onSubmit={onSubmit}>
    <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="name" id="name" class="block py-3 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e)=>{setBookcarwash({...bookCarwash,name:e.target.value})}}/>
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="numberplate" id="numberplate" class="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e)=>{setBookcarwash({...bookCarwash,numberplate:e.target.value})}}/>
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Car's number plate</label>
  </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
  <div class="relative z-0 w-full mb-6 group">
      <input type="number" name="number" id="number" class="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e)=>{setBookcarwash({...bookCarwash,number:e.target.value})}}/>
      <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
  </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-6 group">
        <input type="text" name="address" id="address" class="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e)=>{setBookcarwash({...bookCarwash,address:e.target.value})}}/>
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
    </div>
  </div>

<div className="container flex">
<div className="grid-rows-6 ">
 
<h6><b>Pickup car?</b></h6>
  
    <div class="relative  group">
     
        <input type="radio"  name="pickup" id="pickup" value="yes" placeholder=" " required onChange={(e)=>{setBookcarwash({...bookCarwash,pickup:e.target.value})}} />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm">Yes</label>
        </div>
        <div>
        <input type="radio"  name="pickup" id="pickup" value="no" placeholder=" " required onChange={(e)=>{setBookcarwash({...bookCarwash,pickup:e.target.value})}} />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm">No</label>
    </div>
</div>
<div class="grid-flow-col  mb-11 ml-24">
<h6><b>Type of Service</b></h6>
    <div class="relative">       
        <input type="checkbox"  name="service" id="service" value="carwash" placeholder=" "  onChange={(e)=>{setBookcarwash({...bookCarwash,service:e.target.value})}}/>
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm">Carwash</label>
        <div>
        <input type="checkbox"  name="service" id="service" value="carservice" placeholder=" " onChange={(e)=>{setBookcarwash({...bookCarwash,service:e.target.value})}} />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm">Car Service</label>
        </div>
        </div>
</div>
</div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
</div>

)
}

export default Bookcarwash