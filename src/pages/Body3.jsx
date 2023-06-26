
// import React from 'react';

// function Body3() {
//   return (
//     <div className="flex flex-col">
//       <a href="/">
//         <div className="w-screen  " style={{ background: `url("/img/124062.jpg")`, backgroundSize: 'cover' }}
// >
//           {/* <video
//             className="object-cover w-screen h-screen md:w-screen transition-all"
//             autoPlay
//             muted
//             loop
//           >
//             <source src="" type="video/mp4" />
//           </video> */}
          
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
//             <h2 className="text-xl md:text-2xl mx-4 md:mx-10 font-serif">
//               THE SERVICE YOUR CAR NEEDS
//               <br />
//               Our service, engineered  by the best of engineers out there,
//               <br />
//               solemnly takes care of your car with all the love and care your car deserves.
//               <br />
//               With thorough inspection and checking, we make sure that your car gets the full benefit of our service.
//               <br />
//               After our inspection, we take them down the road to check even further more to make sure everything's clear.
//               <br />
//               Book an appointment now, and your first service is on us.
//             </h2>
//             <div className="bookcarwash mt-4">
//               <a href="/bookcarwash">
//                 <button className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 border border-white-700 rounded-xl">
//                   Book a slot 
//                 </button>
//               </a>
//             </div>
//           </div>
//         </div>
//       </a>
//     </div>
//   );
// }

// export default Body3;

import React from 'react';

function Body3() {
  return (
    <div className="flex flex-col">
      <a href="/">
        <div
          className="relative w-screen h-screen bg-cover"
          style={{ backgroundImage: `url("/img/124062.jpg")` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-xl md:text-2xl mx-4 md:mx-10 font-serif">
              THE SERVICE YOUR CAR NEEDS
              <br />
              Our service, engineered by the best of engineers out there,
              <br />
              solemnly takes care of your car with all the love and care your car deserves.
              <br />
              With thorough inspection and checking, we make sure that your car gets the full benefit of our service.
              <br />
              After our inspection, we take them down the road to check even further more to make sure everything's clear.
              <br />
              Book an appointment now, and your first service is on us.
            </h2>
            <div className="bookcarwash mt-4">
              <a href="/bookcarwash">
                <button className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 border border-white-700 rounded-xl">
                  Book a slot
                </button>
              </a>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Body3;
