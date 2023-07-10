
import React, { useState, useEffect } from 'react'
import "./admintable.css"
import axios from 'axios'
import toast from "react-hot-toast"
// import "./AdminMechanicList.css"
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom'
function AdminMechanicList() {
const [mechanicList,setMechaniclist] = useState([])

const [showDetailsModal, setShowDetailsModal] = useState(false);
const [singleMechanic ,setSinglemechanic] = useState({name:"",email:"",address:"",phone:""})

 
const [pageNumber, setPageNumber] = useState(0);
const itemsPerPage = 7 ;
const pageCount = Math.ceil(mechanicList.length / itemsPerPage);
const startIndex = pageNumber * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedData = mechanicList.slice(startIndex, endIndex);
const navigate = useNavigate()

const handleShowDetailsModal = (data) => {
  setShowDetailsModal(true);
  setSinglemechanic(data)
};
const handleCloseModal = () => {
  setShowDetailsModal(false);
  window.location.reload(false)
};

const blockmechanic = async()=>{
  try {
      const response = await axios.post("http://localhost:1102/api/admin/mechanicblock",mechanicList)
      if(response){
        toast.success(response.data.message)
      }else{
        toast.error("error in blocking")
      }
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
  }
}


const mechdetails=async()=>{
  try {
    const response = await axios.get("http://localhost:1102/api/admin/mechaniclist",{
      headers:
      {
        Authorization : "Bearer " + localStorage.getItem("admintoken")
      }
    })
    console.log(response.data.data,"sasaasassa")
    setMechaniclist(response.data.data)
  } catch (error) {
    toast.error("something went wrong")
  }
}

 

const onSubmit =async(e)=>{
  try {
    const response = await axios.post("http://localhost:1102/api/admin/mechanicedit",singleMechanic,{
      headers:
      {
        Authorization : "Bearer " + localStorage.getItem("admintoken")
      }
    })
  if(response){
    toast.success(response.data.message)
   setTimeout(()=>{
    window.location.reload()
   },1000)
 
  }else{
    toast.error("Not edited")
  }
  } catch (error) {
    console.log(error)
    toast.error("something went wrong")
  }
}

useEffect(() => {
  mechdetails()
}, [])

const handlePageChange = ({ selected }) => {
  setPageNumber(selected);
};

const handleLogout = () => {
    localStorage.removeItem("admintoken")
  }
  return (
  <>
  {showDetailsModal && (
    <div  
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    style={{ transition: 'opacity 0.3s' }}>
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
                    value={singleMechanic?.name}
                    onChange={(e) => {
                      setSinglemechanic({ ...singleMechanic, name: e.target.value });
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
                    value={singleMechanic?.email}
                    className="w-full px-3 py-2 border rounded-md text-gray-500 bg-slate-300"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-semibold mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={singleMechanic?.address}
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={(e) => {
                      setSinglemechanic({ ...singleMechanic, address: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-semibold mb-1">
                    Phone
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={singleMechanic?.phone}
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={(e) => {
                      setSinglemechanic({ ...singleMechanic, phone: e.target.value });
                    }}
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
    <div className="sidebar">
    <p>Admin Dashboard</p>
    <a href="/admin/home">Home</a>
    <a href="/admin/userlist">Users</a>
    <a className="active"  href="/admin/mechanics">Mechanic</a>
    <a href="/admin/mechanicservices">Mechanic service</a>
    <a href="/admin/servicetable">Services</a>
    <a href="/admin/mechregistration">Add a mechanic</a>
    <a href="/admin/plans">Payments</a>
    <a href="" onClick={handleLogout}>Logout</a>
  </div>
  <div className="content">
    <div className="list " key="list">
      <ul key="ul">
         <li key="name">Name</li>
        <li key="email">Email </li>
        <li key="phone">Phone</li>
        <li key="address">Address</li>
        <li key="DOJ">Date Of joining</li>
        <li key="action">Actions</li>
        
      </ul>
      
      {displayedData.map((mechanic)=>(
      <ul>
         <li key={mechanic.name}>{mechanic.name}</li>
         <li key={mechanic.email}>{mechanic.email}</li>
         <li key={mechanic.phone}>{mechanic.phone}</li>
         <li key={mechanic.assign}>{mechanic.address}</li>
         <td>{new Date(mechanic.updatedAt).toLocaleString()}</td> 
         <li data-label="Tutor" className='space-x-2'>
         {/* <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Edit</button>   */}
         <button
                type="button"
                onClick={()=> handleShowDetailsModal(mechanic)}
                className="g-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
              >
                Edit
              </button>
         </li>
         </ul>
      ))}
   
      
  </div>
  <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount}
        onPageChange={({ selected }) => setPageNumber(selected)}
        containerClassName={'pagination1'}
        previousLinkClassName={'pagination__link1'}
        nextLinkClassName={'pagination__link1'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'} />
</div>
</>
  )
}

export default AdminMechanicList
