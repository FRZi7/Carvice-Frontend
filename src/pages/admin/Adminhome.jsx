import React, { useState, useEffect } from 'react';
import "./admintable.css"
import axios from '../../axios/axios'
import { toast } from 'react-hot-toast';


const AdminPage = () => {
  const admintoken = localStorage.getItem("admintoken")
  const [userCount, setUsercount] = useState([])
  const [serviceCount, setServicecount] = useState([])
  const [washCount, setWashcount] = useState([])
  const [mechCount, setMechaniccount] = useState([])
  const [mechWorkcount, setMechanicworkcount] = useState([])
  const [revenue, setRevenue] = useState([])

  const [isMenuOpen, setMenuOpen] = useState(false); // State to track menu open/closed
  const [isMobile, setIsMobile] = useState(false); // State to track mobile view

  const adminHomeDetails = async()=>{
    try {
      const response = await axios.get("/api/admin/adminusercount",{
        headers:{
          Authorization : "Bearer " + localStorage.getItem("admintoken")
        }
      })
      if(response){
        setUsercount(response.data.data)
      }
    } catch (error) {
      toast.loading("something went wrong !")
    }
  }

  const adminServicecount = async()=>{
    try {
      const response = await axios.get("/api/admin/adminservicecount",{
        headers:{
          Authorization : "Bearer " + localStorage.getItem("admintoken")
        }
      })
      if(response){
        setWashcount(response.data.data1)
        setServicecount(response.data.data)
      }
    } catch (error) {
      toast.loading("something went wrong !")
    }
  }

const  mechanicCount = async()=>{
  try {
    const response = await axios.get("/api/admin/adminmechaniccount",{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("admintoken")
      }
    })
    if(response){
      setMechaniccount(response.data.data)
    }
  } catch (error) {
    toast.loading("something went wrong")
  }
 
}

const mechnanicWorkCount = async()=>{
  try {
    const response = await axios.get("/api/admin/mechanicworkscount",{
      headers:{
        Authorization:  "Bearer " + localStorage.getItem("admintoken")
      }
    })
    if(response){
      setMechanicworkcount(response.data.data)
    }
  } catch (error) {
    toast.loading("something went wrong")
  }
  
}

const totalRevenue = async()=>{
  try {
    const response = await axios.get("/api/admin/totalrevenue",{
      headers:{
        Authorization:  "Bearer " + localStorage.getItem("admintoken")
      }
    })
    if(response){
      setRevenue(response.data.data)
    }
  } catch (error) {
    toast.loading("Something went wrong")
  }
}


  const totalUsers = userCount;
  const totalCarwashes = washCount;
  const totalCarServices = serviceCount;
  const mechaniccount = mechCount;
  const mechaniworkcount = mechWorkcount;
  const totalrevenue = revenue;


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

  useEffect(() => {
    adminHomeDetails()
    adminServicecount()
    mechanicCount()
    mechnanicWorkCount()
    totalRevenue()
  })
  

  return (
    <>
    <div className="sidebar">
    <p>Admin Dashboard</p>
    <a className="active" href="/admin/home">Home</a>
    <a href="/admin/userlist">Users</a>
    <a href="/admin/mechanics">Mechanic</a>
    <a href="/admin/mechanicservices">Mechanic Serv</a>
    <a href="/admin/servicetable">Services</a>
    <a href="/admin/mechregistration">Add mechanic</a>
    <a href="/admin/payment">Payments</a>
    <a href="/admin" onClick={handleLogout}>Logout</a>
    </div>


      <div className="flex flex-col flex-grow  p-4">
        <h1 className="text-2xl font-bold ml-52 md:ml-72 mt-2">Admin Dashboard!</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:ml-64 ml-30">
          <div className=" bg-blue-300 p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total Users</h2>  
            <p className="text-3xl font-semibold">{totalUsers}</p>
          </div>
          <div className="bg-slate-300 p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total Car Washes</h2>
            <p className="text-3xl font-semibold">{totalCarwashes}</p>
          </div>
          <div className="bg-slate-300 p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total Car Services</h2>
            <p className="text-3xl font-semibold">{totalCarServices}</p>
          </div>
          <div className="bg-blue-300 p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total Mechanics</h2>
            <p className="text-3xl font-semibold">{mechaniccount}</p>
          </div>
          <div className="bg-blue-300 p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total mechanic services</h2>
            <p className="text-3xl font-semibold">{mechaniworkcount}</p>
          </div>
          <div className="bg-slate-300 p-8 rounded-lg shadow-lg h-48">
            <h2 className="text-xl font-bold mb-4">Total revenue </h2>
            <p className="text-3xl font-semibold">₹{totalrevenue}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage