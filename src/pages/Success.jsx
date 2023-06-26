// import React from 'react'

// function Success() {
//   return (
// <div class="flex items-center justify-center h-screen">
//       <div>
//       <div className="flex flex-col items-center space-y-2" >
//           <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h1 class="text-4xl font-bold">Thank You !</h1>
//           <p>Thank you for Booking! Relax and sit back. Let us do the rest</p>
//           <a
//             class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
//             <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
//               stroke="currentColor" stroke-width="2">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
//             </svg>
//             <span class="text-sm font-medium">
//               <a href='/'>
//               Home
//               </a>
//             </span>
//           </a>
//         </div>
//       </div>
//     </div>  )
// }

// export default Success
import React from 'react';

function Success() {
  return (
    <div className="flex items-center justify-center h-screen">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src="\img\pexels-kelly-4254119-4096x2160-24fps.mp4" type="video/mp4" />
        {/* Add additional source elements for different video formats */}
      </video>
      <div className="relative z-10">
        <div className="flex flex-col items-center space-y-2">
          {/* Your content here */}
          <h1 className="text-4xl font-bold text-white">Thank You!</h1>
          <p className="text-white">✔️Thank you for Booking! Relax and sit back. Let us do the rest</p>
          <a
            className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
            href="/"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm font-medium">Take me Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Success;
