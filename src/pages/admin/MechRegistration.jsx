import axios from '../../axios/axios'
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MechRegistration = () => {
    const [mechRegistration, setMechregistration] = useState({name:"",email:"",phone:"",address:"",password:""})
    const navigate = useNavigate()
    const onSubmit=async(e)=>{
        try {
            e.preventDefault()
            const response = await axios.post("/api/admin/mechanicregistration",mechRegistration)
            if(response){
                toast.success(response.data.message)
                navigate("/admin/mechanics")
            }else{
                toast.error(response.data.message)
                
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    const handleLogout = () => {
      localStorage.removeItem("admintoken")
    }
  return (
    <>
    <div className="sidebar">
    <p>Admin Dashboard</p>
    <a href="/admin/home">Home</a>
    <a routerlink="/admin/userlist">Users</a>
    <a href="/admin/mechanics">Mechanic</a>
    <a href="/admin/mechanicservices">Mechanic service</a>
    <a className="active" href="/admin/mechregistration">Add a mechanic</a>
    <a href="/admin/servicetable">Services</a>
    <a href="/admin/plans">Payments</a>
    <a href="" onClick={handleLogout}>Logout</a>
  </div >
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={onSubmit}> 
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline required"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your username"
            onChange={(e)=>{setMechregistration({...mechRegistration,name:e.target.value})}}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e)=>{setMechregistration({...mechRegistration,email:e.target.value})}}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            name="address"
            type="address"
            placeholder="Enter your email"
            onChange={(e)=>{setMechregistration({...mechRegistration,address:e.target.value})}}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="number"
            placeholder="Enter your email"
            onChange={(e)=>{setMechregistration({...mechRegistration,phone:e.target.value})}}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="********"
            onChange={(e)=>{setMechregistration({...mechRegistration,password:e.target.value})}}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
                        >
            Register
          </button>
        </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default MechRegistration;
