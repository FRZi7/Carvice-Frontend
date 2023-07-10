import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { addUsers } from './redux/userSlice';
import Footer from './Footer';
import ReactPaginate from 'react-paginate';
import "./Edituser.css"
function EditUser() {

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userid = decoded.id;
  const userData = useSelector((store) => store.user?.items);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showServiceHistoryModal, setShowServiceHistoryModal] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: userData.name });
  const [serviceHistory, setServiceHistory] = useState([]);

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
  };
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowServiceHistoryModal(false);
  };

  const onSubmit = async (e) => {
    try {
      const response = await axios.post(
        'http://localhost:1102/api/user/edituser',
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
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const fetchServiceHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:1102/api/user/servicehistory`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (response) {
        console.log(response.data.data);
        setServiceHistory(response.data.data);
        setShowServiceHistoryModal(true);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch service history');
    }
  };

  useEffect(() => {
    onSubmit();
  }, []);

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
                View Service History
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

        {showServiceHistoryModal && (
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
                  </tr>
                </thead>
                <tbody>
                  {displayedData.map((service) => (
                    <tr key={service.id}>
                      <td className="px-4 py-2">{service.name}</td>
                      <td className="px-4 py-2">{service.numberplate}</td>
                      <td className="px-4 py-2">{service.phone}</td>
                      <td className="px-4 py-2">{service.address}</td>
                      <td>{new Date(service.updatedAt).toLocaleString()}</td>
                      <td className="px-4 py-2">{service.service}</td>
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
