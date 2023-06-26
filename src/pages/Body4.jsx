import React from 'react'

function Body4() {
  return (
<div className="flex flex-col mt-40 ml-20 p-3">
  <a href='/'>
    <div className="mb-4 jdmcarwash relative">
      <img
        src="img\jdm-car-in-car-wash-1v6rt4v20got0e7e.jpg"
        className="object-cover w-96 h-80 rounded-3xl transition-all"
        alt=""
      />
      <div className="absolute inset-0 flex items-center justify-center text-justify">
        <h2 className="text-white text-3xl mx-10 font-bold">
          THE MECHANIC<br/>
          Our car wash is deemed to be the <br/>
          best of all the car washes out there. <br/>
          We pick out the right one meant for your <br/>
          JDM so that you don't miss out on the<br/>
          freshness that you drive everyday.<br/>
          We make sure your car gets the wash it needs.<br/>
          The paint on these cars are exclusive <br/>
          and we have the right washing materials <br/>
          for your car, and don't worry, we have experts.<br/>
          Book an appointment now, and your first wash is on us.
        </h2>
        <div className='bookcarwash mt-4 ml-20 align-text-top'>
          <a href='/mechanic'><button className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 border border-white-700 rounded">Book a slot 💦</button></a>
        </div>
      </div>
    </div>
  </a>
  <a href='/'>
    <div className="mb-4 maxres relative">
      <img
        src="img\maxresdefault.jpg"
        className="object-cover w-96 h-80 rounded-3xl"
        alt=""
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-3xl font-bold"></div>
      </div>
    </div>
  </a>
</div>

  )
}

export default Body4