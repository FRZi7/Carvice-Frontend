import axios from 'axios';
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
    const pageCount = Math.ceil( userInfo / itemsPerPage);
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = userInfo.slice(startIndex, endIndex);
    
    const userDetails =async()=>{
        try {
            const response = await axios.get("http://localhost:1102/api/admin/userdetails",{
              headers:
              {
                Authorization : "Bearer " + localStorage.getItem("admintoken")
              }
            })
        if(response){
            console.log(response.data.data)
            toast.success(response.data.message)
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
        const response = await axios.post("http://localhost:1102/api/admin/block",userInfo,{
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

    useEffect(() => {
        userDetails()
    }, [])
    
const handleBlockingUser=(data)=>{
  userBlock(data)
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
         <li key="name">Name</li>
        <li key="email">Email </li>
        <li key="phone">Phone</li>
        <li key="date">Date of joining</li>
        <li key="action">Actions</li>
      </ul>
      
    {displayedData.map((user)=>(
      <ul>
         <li key="name">{user.name}</li>
         <li key="email">{user.email}</li>
         <li key="phone">{user.phone}</li>
         <td>{new Date(user.updatedAt).toLocaleString()}</td> 
         <li data-label="Tutor" className='space-x-2'>
         <button
                type="button"
                onClick={()=> handleBlockingUser(user)}
                className="g-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded "
              >
                Block
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

export default AdminUserList