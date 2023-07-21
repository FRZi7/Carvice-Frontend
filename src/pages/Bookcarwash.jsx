

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from '../axios/axios';

import Success from './Success';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import jwt_decode from "jwt-decode"
import Footer from './Footer';

function Bookcarwash() {
  const token = localStorage.getItem("token")
  const decoded = jwt_decode(token)
  const userId = decoded.id
  
  const navigate = useNavigate();  
  const [bookCarwash, setBookCarwash] = useState({
    name: '',
    numberplate: '',
    number: '',
    address: '',
    pickup: '',
    service: [],
    userid : userId,
    totalPayment:''
  });
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (bookCarwash.service.length === 0) {
        toast.error('Please select either Carwash or Car Service');
        return;
      }
     
      const totalPrice = calculation()
      setBookCarwash(totalPrice)
      setBookCarwash({ ...bookCarwash, totalPayment: totalPrice });
      const response = await axios.post(
        '/api/user/service',
        {bookCarwash},
        {
          headers:{
            Authorization : "Bearer "+ localStorage.getItem("token")
          },
        }
        );
      if (response.data.success) {
        toast.success('Booking successful');
        navigate('/success');
      } else {
        toast.error('Booking unsuccessful');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleServiceSelection = (e) => {
    const selectedService = e.target.value;
    const isChecked = e.target.checked;
  
    if (isChecked) {
      setBookCarwash((prevBookCarwash) => ({
        ...prevBookCarwash,
        service: [...prevBookCarwash.service, selectedService], //what this does is, it creates a service array , the, the spread makes a copy from the origiinal value(ahallow copy) and then the selected SERvice is passed into it
      }));
    } else {
      setBookCarwash((prevBookCarwash) => ({
        ...prevBookCarwash,
        service: prevBookCarwash.service.filter(
          (service) => service !== selectedService //chercked allaann indenki, then it is not equal to the serviec, therefore, it is not sent or selected therefore it wont be send to the database
        ),
      }));
    }
  };

  const prices=(service)=>{
    if(service === "carwash"){
      return 200
    }else if(service === "carservice"){
      return 500
    }else{
      return 0
    }
  } 

  const calculation =()=>{
    let totalPrice = 0
    bookCarwash.service.forEach((service)=>{
      const servicePrice = prices(service)
      totalPrice += servicePrice
    })
    return totalPrice
  }

  useEffect(() => {
    const totalPrice = calculation();
    setBookCarwash((prevBookCarwash) => ({
      ...prevBookCarwash,
      totalPayment: totalPrice,
    }));
  }, [bookCarwash.service]);
  return (
    <>
    <div className="bookingcarname">
      <Navbar />
      <div className="relative justify-center">
        <img
          src="\img\maxresdefault.jpg"
          className="imgg w-screen h-80 object-cover"
          alt="LOGO"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-7xl font-bold font-serif">
            BOOKING   
          </h1>
        </div>
      </div>
      <div className="bookcarwash rounded-2xl mx-auto my-20 border-4 border-sky-500 p-20 bg-slate-200 w-full max-w-lg">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-3 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) =>
                  setBookCarwash({ ...bookCarwash, name: e.target.value })
                }
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="numberplate"
                id="numberplate"
                className="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) =>
                  setBookCarwash({
                    ...bookCarwash,
                    numberplate: e.target.value,
                  })
                }
              />
              <label
                htmlFor="numberplate"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Car's number plate
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="number"
                id="number"
                className="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) =>
                  setBookCarwash({ ...bookCarwash, number: e.target.value })
                }
              />
              <label
                htmlFor="number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="address"
                id="address"
                className="block py-2.5 px-0 w-full text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) =>
                  setBookCarwash({ ...bookCarwash, address: e.target.value })
                }
              />
              <label
                htmlFor="address"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Address
              </label>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h6 className="text-xl">
              <b>Pickup car?</b>
            </h6>
            <div className="flex items-center">
              <input
                type="radio"
                name="pickup"
                id="pickup-yes"
                value="yes"
                className="mr-2"
                required
                onChange={(e) =>
                  setBookCarwash({ ...bookCarwash, pickup: e.target.value })
                }
              />
              <label htmlFor="pickup-yes">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="pickup"
                id="pickup-no"
                value="no"
                className="mr-2"
                required
                onChange={(e) =>
                  setBookCarwash({ ...bookCarwash, pickup: e.target.value })
                }
              />
              <label htmlFor="pickup-no">No</label>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h6 className="text-xl" >
              <b>Type of Service</b>
            </h6>
            <div className="flex items-center" required>
              <input
                type="checkbox"
                name="service"
                id="service-carwash"
                value="carwash"
                className="mr-2"
               
                onChange={handleServiceSelection}
              />
              <label htmlFor="service-carwash">Carwash</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="service"
                id="service-carservice"
                value="carservice"
                className="mr-2"
                
                onChange={handleServiceSelection}
              />
              <label htmlFor="service-carservice">Car Service</label>
            </div>
            <div>
            <p>Total Price:{calculation()}</p>
            </div>
            <input type='text' name="userid" id="userid" value={userId} hidden></input>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      </div>
    </div>
    <div>
      <Footer/>
    </div>
    </>
  );
}

export default Bookcarwash;
