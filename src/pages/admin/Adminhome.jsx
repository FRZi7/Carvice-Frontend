
import React, { useState, useEffect } from 'react';
import "./admintable.css"


const AdminPage = () => {
  const admintoken = localStorage.getItem("admintoken")
  const [isMenuOpen, setMenuOpen] = useState(false); // State to track menu open/closed
  const [isMobile, setIsMobile] = useState(false); // State to track mobile view

  // Dummy data for the details
  const totalUsers = 500;
  const totalCarwashes = 1000;
  const totalCarServices = 750;
  const totalRevenue = '$10,000';


  const handleLogout = () => {
    localStorage.removeItem("admintoken")
  }

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Check if the current screen size is mobile
  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Add event listener to track window resize
    window.addEventListener('resize', checkMobileView);

    // Initial check
    checkMobileView();

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  return (
    <>
    <div className="sidebar">
    <p>Admin Dashboard</p>
    <a href="/admin" onClick={handleLogout}>Logout</a>
    <a href="/admin/servicetable">Services</a>
    <a href="/admin/userlist">Users</a>
    <a  href="/admin/mechanics">Mechanic</a>
    <a href="/admin/mechanicservices">Mechanic Serv</a>
    <a href="/admin/mechregistration">Add mechanic</a>
    <a href="/admin/payment">Payments</a>
    </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-gray-100 p-4">
        {/* Mobile menu toggle button */}
        {isMobile && (
          <button
            className="md:hidden mb-4 px-2 py-1 bg-gray-800 text-white rounded-md"
            onClick={toggleMenu}
          >
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        )}

        <h1 className="text-2xl font-bold ml-52 md:ml-72 ">Admin Dashboard!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-64 ml-30">
          <div className="flex justify-start bg-white p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total Users</h2>
            <p className="text-3xl font-semibold">{totalUsers}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total Car Washes</h2>
            <p className="text-3xl font-semibold">{totalCarwashes}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total Car Services</h2>
            <p className="text-3xl font-semibold">{totalCarServices}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total Mechanics</h2>
            <p className="text-3xl font-semibold">{totalRevenue}</p>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Total Revenue</h2>
            <p className="text-3xl font-semibold">{totalRevenue}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage