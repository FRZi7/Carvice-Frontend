import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Body from './Body'
import Body2 from './Body2'
import Body3 from './Body3'
import Body4 from './Body4'
import axios from "axios"
import Footer from './Footer'


function Home() {
  
  const [userData,SetUserdata] = useState(" ")
  const getData = async()=>{
    try {
      const response = await axios.post("http://localhost:1102/api/user/get-user-info-by-id",{},{
        headers:{
          Authorization : "Bearer "+ localStorage.getItem("token")
        },
      })
      console.log(response.data.data,"auth success")
      // console.log(response.data.data.name,"hi")
      // SetUserdata(response.data.data.name)
    } catch (error) {
      console.log("here is the error :",error)
    }
  }
 useEffect(() => {
   getData() //By passing an empty dependency array ([]) as the second argument to useEffect, it ensures that the effect is only run once during the initial rendering of the component. This prevents the effect from running repeatedly or being triggered by changes in props or state.
 }, [])
 
  return (
    <>
      <div className='h-screen w-screen overflow-hidden mainpage'>
      <div className="r h-screen w-screen bg-center bg-cover" style={{ backgroundImage: 'url("img/melih-karaahmet-Tkz9YXDn3FY-unsplash.jpg")' }}>
        <Navbar/>
        <Body/>
        <div className="flex flex-wrap justify-start">
        </div>
       </div>
      </div>
      <div id='carwash'>
       <div className='h-screen w-screen overflow-hidden bg-gradient-to-r from-cyan-500 to-red-500'>
          <Body2/>
       </div>
       <div className='h-screen w-screen overflow-hidden bg-gradient-to-r from-cyan-500 to-red-500'>
          <Body3/>
       </div>
       <div className='h-screen w-screen overflow-hidden bg-gradient-to-r from-cyan-500 to-red-500'>
          <Body4/>
       </div>
       <div className='h-screen w-screen overflow-hidden bg-gradient-to-r from-gray-500 to-white-500'>
          <Footer/>
       </div>
      </div>
    </>

  )
}

export default Home