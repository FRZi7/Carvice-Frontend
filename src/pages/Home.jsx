import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Body from './Body'
import Body2 from './Body2'
import Body3 from './Body3'
import Body4 from './Body4'
import Body5 from './Body5'
import axios from "axios"
import Footer from './Footer'


function Home() { 
  return (
    <>
      <div className='h-screen w-screen' >
      <div className=" h-screen w-full bg-center bg-cover" style={{ backgroundImage: 'url("img/melih-karaahmet-Tkz9YXDn3FY-unsplash.jpg")' }}>
        <Navbar/>
        <Body/>
        <div className="flex flex-wrap justify-start">
        </div>
       </div>
      </div>
      <div id='carwash'>
       <div className='h-screen w-screen bg-gradient-to-r from-black to-slate-950'>
          <Body2/>
       </div>
       <div className='h-screen w-screen overflow-hidden bg-gradient-to-r from-black to-slate-950'>
          <Body3/>
       </div>
       <div className='h-screen w-fit bg-gradient-to-r from-black to-slate-950'>
          <Body4/>
       </div>
       <div className='h-screen w-fit bg-gradient-to-r from-black to-slate-950'>
          <Body5/>
       </div>
       <div className=' bg-gradient-to-r from-gray-500 to-white-500'>
          <Footer/>
       </div>
      </div>
    </>

  )
}

export default Home