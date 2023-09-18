import React from 'react'



function Body() {

  return (
<>
<div className="flex justify-around mt-40">
  <div className="mb-4 nagata relative">
    <link to=''/>
    <img
      src="img/3bf66bafff1d8169.jpg"
      className="object-cover w-80 h-52 rounded-3xl transition-all"
      alt=""
    />
    <div className="absolute inset-0 flex items-center justify-center">
      < h2 className="text-white text-3xl font-serif	">Mechanic</h2>
    </div>
    
  </div> 
  <a href="">
  <div className="mb-4 maxres relative">
    <img
      src="img/car-7291166_960_720.jpg"
      className="object-cover w-80 h-52 rounded-3xl"
      alt=""
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <h2 className="text-white text-3xl font-serif	">Car Wash</h2>
    </div>
  </div>
  </a>
  <a href=''>
  <div className="mb-4 landing relative max-w-sm">
    <img
      src="img/8s4a9017.jpg"
      className="object-cover w-80 h-52 rounded-3xl"
      alt=""
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <h2 className="text-white text-3xl font-serif	">Car Service</h2>
    </div>
  </div>
</a> 
</div>
</>
  )
}

export default Body