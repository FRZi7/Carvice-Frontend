import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Body from './Body'
import Body2 from './Body2'
import Body3 from './Body3'
import Body4 from './Body4'
import Body5 from './Body5'
import axios from "axios"
import Footer from './Footer'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Route } from 'react-router-dom'


function Home() { 
  return (
    <>   
      <div className='h-screen w-screen' overflow-x-hidden >
      <div className=" h-screen w-full bg-center bg-cover" style={{ backgroundImage: 'url("img/peakpx.jpg")'}}>
        <Navbar/>
        <Body/>
       </div>
      </div>
      <div id='carwash'>
       <div className='h-screen w-52 bg-gradient-to-r from-black to-slate-950'>
         {/* <Route path='/body'/> */}
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