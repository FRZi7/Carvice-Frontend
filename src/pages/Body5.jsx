import React from 'react';

function Body5() {
  return (
    <div className="flex flex-col">
      <div>
        <div className="relative w-screen h-screen bg-cover">
          <div className="absolute inset-0 mt-60 flex flex-col ml-5 md:mt-60 items-start justify-center text-white text-center">
            <div className="text-3xl md:text-4xl mb-10   md:mb-32 md:mx-14 font-serif relative z-40">
              OUR ONLINE BOOKING
            </div>
            <h2 className=" mb-48 text-2xl text-white md:text-2xl md:text-zinc-50 md:mx-10 text-start font-serif relative z-50">
              <br />
              Our service, engineered by the best of engineers out there,
              <br />
              solemnly takes care of your car with all <br/> the love and care your car deserves.
              <br />
              With thorough inspection and checking, we make sure <br/>that your car gets the full benefit of our service.
              <br />
              After our inspection, we take them down the road to<br/> check even further more to make sure everything's clear.
              <br />
              Book an appointment now. 
            </h2>
            <div className="bookcarwash mt-4">
              <a href="/bookcarwash"></a>
            </div>
          </div>
          <div className="pic1 flex md:h-128  h-128  md:ml-  ml-36 mb-10 md:mb-24 absolute inset-x-0 bottom-0 justify-center">
            <img src="\img\photo-1592150873193-e001e1a14fdc 1 (1).png" alt="Image 1" className="h-auto md:h-full object-cover" />
          </div>
          <div className="pic2 flex md:h-128  h-128  md:ml-48 mr-14 ml-36 mb-10 md:mb-24 absolute inset-x-0 bottom-0 justify-end">
            <img src=" \img\black-dark-cars-photography-nissan-vehicles-matte-black-cars-nissan-skyline-gtr-r34-1920x1200-wal-abstract-photography-hd-art-wallpaper-preview 1.png" alt="Image 1" className="h-auto md:h-full object-cover" />
          </div>
          <div className="pic3 flex md:h-128  h-128  md:ml-129  mb-10 md:mb-24 absolute inset-x-0 bottom-0 justify-stretch">
            <img src="\img\bugatti-chiron-pur-sport-black-cars-5k-8k-2560x2560-4975 1.png" alt="Image 1" className="h-auto md:h-full object-cover" />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Body5;
