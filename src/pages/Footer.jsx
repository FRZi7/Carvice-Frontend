import React from 'react';

function Footer() {
  return (
    <footer className="h-30 w-screen bg-gray-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center  justify-end">
          {/* Insert your logo */}
          <img src="\img\logo-no-background-photoaidcom-cropped (1).png" alt="" className="flex h-24 ml-10 justify-" />
          <p className="text-gray-300 text-sm m-11">
          COMPANY <br/>
          SERVICES <br/>
          CONTACT US <br/>
          PRIVACY & LEGAL
          </p>
        </div>
        <div className="flex items-center space-x-11 mr-20">
          {/* Contact Information */}
          <p className="text-gray-300 text-sm">Phone: 123-456-7890</p>
          <p className="text-gray-300 text-sm">Email: info@carvice.com</p>
        </div>
      </div>
      <div className="container mx-auto flex justify-center items-center mt-4">
        <p className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Carvice. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
