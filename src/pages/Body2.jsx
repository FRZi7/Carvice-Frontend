
import React, { useEffect, useRef } from 'react';

function Body2() {
  const textRef = useRef(null);

  useEffect(() => {
    const fadeTextOnScroll = () => {
      const textElement = textRef.current;
      const scrollPosition = window.pageYOffset;

      if (textElement) {
        const textTopOffset = textElement.offsetTop;
        const textHeight = textElement.offsetHeight;

        const fadeStart = textTopOffset + textHeight / 2;
        const fadeEnd = textTopOffset + textHeight;

        const opacity = Math.max(0, Math.min(1, (scrollPosition - fadeStart) / (fadeEnd - fadeStart)));

        textElement.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', fadeTextOnScroll);

    return () => {
      window.removeEventListener('scroll', fadeTextOnScroll);
    };
  }, []);

  return (
    <div className="w-screen">
      <a href="/">
        <div className="w-screen relative">
          <video
            className="object-cover h-screen md:w-full transition-all"
            autoPlay
            muted
            loop
          >
            <source src="\img\pexels-tima-miroshnichenko-6873504-3840x2160-25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center" ref={textRef}>
            <h2 className="text-xl md:text-2xl mx-4 md:mx-10 font-serif">
              THE CLEANEST WAY
              <br />
              Our car wash is deemed to be the best of all the car washes out there.
              <br />
              We pick out the right one meant for your machine so that you don't miss out on the freshness that you drive everyday.
              <br />
              We make sure your car gets the wash it needs.
              <br />
              The paint on these cars are exclusive and we have the right washing<br/> materials for your car, so don't worry, we'll take care of it with utmost care.
              <br />
              Book an appointment now, and your first wash is on us.
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

export default Body2;
