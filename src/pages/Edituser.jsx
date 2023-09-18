import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios/axios';
import { toast } from 'react-hot-toast';
import { addUsers } from './redux/userSlice';
import Footer from './Footer';
import ReactPaginate from 'react-paginate';
import useRazorpay from "react-razorpay";
import "./Edituser.css"
import { useNavigate } from 'react-router-dom';

function EditUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userid = decoded.id;
  const userData = useSelector((store) => store.user?.items);
  const [Razorpay] = useRazorpay();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: userData.name });
  const [serviceHistory, setServiceHistory] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [serviceId, setServiceid] = useState([])
  const [showServiceHistoryModal, setShowServiceHistoryModal] = useState(false);
  const [showMechanicHistoryModal, setshowMechanicHistoryModal] = useState(false);
  const [mechanicHistory, setMechanicHistory] = useState([])

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 7;
  const pageCount = Math.ceil(serviceHistory.length / itemsPerPage);
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = serviceHistory.slice(startIndex, endIndex);

  const handleShowDetailsModal = () => {
    setShowDetailsModal(true);
  };
  const handleShowServiceHistoryModal = () => {
    setShowServiceHistoryModal(true);
    setshowMechanicHistoryModal(true)
  };
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowServiceHistoryModal(false);
    setshowMechanicHistoryModal(false)
    
  };

  const onSubmit = async(e) => {
    try {
      const response = await axios.post(
        '/api/user/edituser',
        userDetails,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      if (response) {
        dispatch(addUsers(response.data.userEdit));
      } else {
        toast.error('Edit failure');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const fetchServiceHistory = async () => {
    try {
      const response = await axios.get(`/api/user/servicehistory`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (response) {
        setServiceHistory(response.data.data);
        setShowServiceHistoryModal(true,response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch service history');
    }
  };

  
  const fetchMechanicHistory = async () => {
    try {
      const history = await axios.get(`/api/user/mechanichistory`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (history) {
        setMechanicHistory(history.data.data);
        setshowMechanicHistoryModal(true,history.data.data);
      }
    } catch (error) {
     
      toast.error('Failed to fetch history');
    }
  };

  const confirm =async()=>{
    try {
      setShowConfirmationModal(false);
      const id = serviceId
      const cancellation = await axios.post(`/api/user/cancellation/${id}`,{},{
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      if(cancellation){
        toast.success("Cancelled successfully")
        fetchServiceHistory();
      }
    } catch (error) {
      toast.loading("Something went wrong")
    }
  }

  const cancel = async(e,id)=>{
   const ee = e.target.value
   const id_service = id
   setServiceid(id_service)
    setShowConfirmationModal(true);
  }

 const handlePayment = async (amount,id) => {
   const options = {
     key: "rzp_test_GJjSkE5HCfYrlI",
     amount: amount*100, 
     currency: "INR",
     name: "CARVICE",
     description: "Service Transaction",
     image: "/img/logo-color-modified.png",
     handler: async function (response) {
       if(response.razorpay_payment_id){
        const order = await axios.post(`/api/user/payment/${id}`,{amount:amount,paymentId:response.razorpay_payment_id});
        window.location.reload()
      }else{
        toast.error("Payment failed")
      };
      },
      prefill: {
        name: "CARVICE",
        email: "carvice@gmail.com",
        contact: "8921111685",
      },
      notes: {
        address: "Carvice Corporate Office",
      },
      theme: {
        color: "#FF0000",
      },
    };
  
    const rzp1 = new Razorpay(options);
  
    rzp1.on("payment.failed", function (response) {
   toast.error("Payment failed")
    });
  
    rzp1.open();
  };
 const handlePaymentofservice = async (amount,id) => {
   const options = {
     key: "rzp_test_GJjSkE5HCfYrlI",
     amount: amount*100, 
     currency: "INR",
     name: "CARVICE",
     description: "Service",
     image: "/img/logo-color-modified.png",
  
     handler: async function (response) {
       if(response.razorpay_payment_id){
        const order = await axios.post(`/api/user/paymentofservice/${id}`,{amount:amount,paymentId:response.razorpay_payment_id});
        (response)
        window.location.reload()
      }else{
        toast.error("Payment failed")
      };
      },
      prefill: {
        name: "Carvice",
        email: "carvice@gmail.com",
        contact: "8921111685",
      },
      notes: {
        address: "Carvice Corporate Office",
      },
      theme: {
        color: "#FF0000",
      },
    };
  
    const rzp1 = new Razorpay(options);
  
    rzp1.on("payment.failed", function (response) {
   toast.error("Payment failed")
    });
  
    rzp1.open();
  };





  useEffect(() => {
    onSubmit();
  }, [confirm]);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="edituser">
        <Navbar />
        <div
          className="flex justify-center items-center object-fill min-h-screen w-screen overflow-y-hidden"
          style={{ background: `url('/img/8s4a9017.jpg')`, backgroundSize: 'cover' }}
        >
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
            <div className="mb-4">
              <button
                type="button"
                onClick={handleShowDetailsModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
              >
                Change User Details
              </button>
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={fetchServiceHistory}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
              >
                View Service History & payment
              </button>
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={fetchMechanicHistory}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
              >
                View Mechnanic History & payment
              </button>
            </div>
          </div>
        </div>

        {showDetailsModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ transition: 'opacity 0.3s' }}
          >
            <div className="w-96 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Change User Details</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block font-semibold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userDetails?.name}
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, name: e.target.value });
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData?.email}
                    className="w-full px-3 py-2 border rounded-md text-gray-500 bg-slate-300"
                    disabled
                  />
                </div>
              </form>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      {showConfirmationModal && (
        <div className="modal">
            <div className="modal-content">
              <h2>Confirmation</h2>
              <p>Are you sure you want to cancel?</p>
              <button
                onClick={confirm}
                >
              Confirm
              </button>
              
              <button
                onClick={() => {
                  // Handle cancellation modal close logic here
                  setShowConfirmationModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
      )}


        {showServiceHistoryModal &&(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ transition: 'opacity 0.3s' }}
          >
            <div className="w-fit bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-950 mb-4 text-center">Service History</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Number Plate</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Date & Time</th>
                    <th className="px-4 py-2">Service</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Cancellation</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {displayedData.map((service) => (
                    <tr>
                      <td className="px-4 py-2">{service.name}</td>
                      <td className="px-4 py-2">{service.numberplate}</td>
                      <td className="px-4 py-2">{service.phone}</td>
                      <td className="px-4 py-2">{service.address}</td>
                      <td>{new Date(service.updatedAt).toLocaleString()}</td>
                      <td className="px-4 py-2">{service.service[0]} &nbsp; {service.service[1]}</td>
                      <td className="px-4 py-2">₹{service.totalamount}</td>
                      
                      {/*here below, with the help of the so displayed Data, try thp find the rgiht amount and the id to pass it to the razorpay pay thingy*/}
                      {service.paymentStatus === "paid"? 
                      <button className="bg-slate-500 text-white font-bold py-1 px-4 border border-slate-700 rounded"  onClick={()=>{handlePaymentofservice(service.totalamount,service._id)}} disabled>Paid</button>:
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 border border-red-700 rounded" onClick={()=>{handlePaymentofservice(service.totalamount,service._id)}}>Pay Now</button>
                       }
                      <td className="px-4 py-2">{service.paymentStatus}</td>
                      {service.paymentStatus === "paid"? 
                      <button className="px-4 py-1 bg-slate-500 hover:bg-sate-700 text-white font-bold border border-slate-700 rounded" disabled>
                         Cancel
                      </button>:
                      <button className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded"  onClick={(e)=>{cancel(e,service._id)}}>
                        Cancel
                      </button>
                      }
                    </tr>
                      ))}
                </tbody>
              </table>
              <div className="flex justify-center ">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  pageCount={pageCount}
                  onPageChange={({ selected }) => setPageNumber(selected)}
                  containerClassName={'pagination'}
                  previousLinkClassName={'pagination__link'}
                  nextLinkClassName={'pagination__link'}
                  disabledClassName={'pagination__link--disabled'}
                  activeClassName={'pagination__link--active'}
                 
                />
              </div>
              <div className="flex justify-center  mt-5" >
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {showMechanicHistoryModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ transition: 'opacity 0.3s' }}
          >
            <div className="w-fit bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-950 mb-4 text-center">Mechanic History</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Number Plate</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Issued on</th>
                    <th className="px-4 py-2">Issue</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Options</th>


                  </tr>
                </thead>
                <tbody>
                  {mechanicHistory.map((service) => (
                    <tr key={service.id}>
                      <td className="px-4 py-2">{service.name}</td>
                      <td className="px-4 py-2">{service.numberplate}</td>
                      <td className="px-4 py-2">{service.phone}</td>
                      <td className="px-4 py-2">{service.address}</td>
                      <td className='px-4 py-2'>{new Date(service.updatedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{service.issue}</td>
                      <td className="px-4 py-2">₹{service.amount}</td>
                      <td className="px-4 py-2">{service.payment_status}</td>
                      {service.payment_status==="paid"?(
                      <button className=" bg-slate-500  text-white font-bold py-1 px-4 border border-slate-500 rounded" disabled>Paid</button>
                      ): <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 border border-red-700 rounded" onClick={()=>{handlePayment(service.amount,service._id)}}>Pay Now</button>}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center ">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  pageCount={pageCount}
                  onPageChange={({ selected }) => setPageNumber(selected)}
                  containerClassName={'pagination'}
                  previousLinkClassName={'pagination__link'}
                  nextLinkClassName={'pagination__link'}
                  disabledClassName={'pagination__link--disabled'}
                  activeClassName={'pagination__link--active'}
                 
                />
              </div>
              <div className="flex justify-center  mt-5" >
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default EditUser;
