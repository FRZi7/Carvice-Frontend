import axios from '../../axios/axios'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import ReactPaginate from 'react-paginate';

function AdminUserList() {

    const [userInfo,setUserinfo] = useState([])
    console.log(userInfo,"hgh")

  
    const handleLogout = () => {
        localStorage.removeItem("admintoken")
      }
      
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 7 ;
    const pageCount = Math.ceil( userInfo.length / itemsPerPage);
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = userInfo.slice(startIndex, endIndex);
    console.log(displayedData,"displa")
    
    const userDetails =async()=>{
        try {
            const response = await axios.get("/api/admin/userdetails",{
              headers:
              {
                Authorization : "Bearer " + localStorage.getItem("admintoken")
              }
            })
        if(response){ 
            setUserinfo(response.data.data)
    
        }else{
            toast.error(response.data.message,"error")
        }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    const handlePageChange = ({ selected }) => {
      setPageNumber(selected);
    };

    
    const userBlock = async()=>{
      try {
        const response = await axios.post("/api/admin/block",userInfo,{
          headers:
          {
            Authorization : "Bearer " + localStorage.getItem("admintoken")
          }
        })
        if(response){
          toast.success("block")
        }else{
          toast.error("nope")
        }
      } catch (error) {
        toast.loading("something went wrong")
      }
    }

    const userUnblock =async(id)=>{
      try {
        const response = await axios.post(`/api/admin/userunblock/${id}`,{
        headers:
        {
          Authorization : "Bearer " + localStorage.getItem("admintoken")
        }
      })
      if(response){
        toast.success("successfully unblocked")
      }
      } catch (error) {
        console.log(error)
        toast.loading("something went wrong")
      }
    }

    useEffect(() => {
        userDetails()
    }, [])

    
    
const handleBlockingUser=(data)=>{
  userBlock(data)
} 

const handleUnblockingUser = (id)=>{
  userUnblock(id)
}
    
  return (
    <>
    <div className="sidebar">
    <p>Admin Dashboard</p>
    <a href="/admin/home">Home</a>
    <a className="active" href="/admin/userlist">Users</a>
    <a href="/admin/mechanics">Mechanic</a>
    <a href="/admin/mechanicservices">Mechanic service</a>
    <a href="/admin/servicetable">Services</a>
    <a href="/admin/mechregistration">Add a mechanic</a>
    <a href="/admin/plans">Payments</a>
    <a href="" onClick={handleLogout}>Logout</a>
    </div>

    <div className="content">
    <div className="list " key="list">
      <ul key="ul">
         <li  key="name">Name</li>
        <li data-label="Name" key="email">Email </li>
        <li data-label="Name" key="phone">Phone</li>
        <li data-label="Name" key="date">Date of joining</li>
        <li data-label="Name" key="action">Actions</li>
      </ul>
      
    {displayedData.map((user)=>(
      <ul>
         <li data-label="Name" key="name">{user.name}</li>
         <li data-label="Email" key="email">{user.email}</li>
         <li data-label="Phone" key="phone">{user.phone}</li>
         <li data-label="Update">{new Date(user.updatedAt).toLocaleString()}</li> 
         <li data-label="" className='space-x-2'>
          {user.access === true ? 
          <button type="button" onClick={()=> handleBlockingUser(user)}
          className="g-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ">Block</button>
          :
          <button type="button" onClick={()=> handleUnblockingUser(user._id)}
          className="g-transparent hover:bg-slate-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded ">Unblock</button> 
          }
         
      
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

export default AdminUserList