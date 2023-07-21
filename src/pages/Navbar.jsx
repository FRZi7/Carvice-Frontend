import React, { useEffect, useState } from 'react';
import './navbarr.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const userData = useSelector((store)=>store.user?.items)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const userCheck = localStorage.getItem('token');
    if (userCheck) {
      setIsLogged(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('persist:root');
    window.location.reload();
  };

  return (
    <nav className="w-scree relative z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg ">
      <div className="max-w-screen mx-auto px-6 sm:px-48 lg:px-48">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="navimg" src="img\logo-color-modified.png" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-52">
                <a
                  href="/"
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition delay-150 duration-150 ease-in-out"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition delay-150 duration-150 ease-in-out"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition delay-150 duration-150 ease-in-out"
                >
                  About Us
                </a>
                {isLogged ? (
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition delay-150 duration-150 ease-in-out focus:outline-none"
                        onClick={toggleMenu}
                      >
                        {userData?.name}
                        <svg
                          className="ml-1 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                    {isMenuOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <a
                            href="/edituser"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Account Settings & payments
                          </a>
                         
                          <button
                            onClick={logout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            role="menuitem"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href="/login"
                    className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition delay-150 duration-150 ease-in-out"
                  >
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden transition-max-height duration-300 ease-in-out`}
        id="mobile-menu"
        style={{ maxHeight: isMenuOpen ? '500px' : '0', transition: 'max-height 0.3s ease-in-out' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition delay-75 duration-75 ease-in-out"
          >
            Home
          </a>
          <a
            href="#"
            className="text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition delay-75 duration-75 ease-in-out"
          >
            About
          </a>
          <a
            href="#"
            className="text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition delay-75 duration-75 ease-in-out"
          >
            Services
          </a>
          <a
            href="#"
            className="text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition delay-75 duration-75 ease-in-out"
          >
            Contact
          </a>
          <a
            href="/login"
            className="text-black-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition delay-75 duration-75 ease-in-out"
          >
            {isLogged ?  userData?.name : "login"}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
