import React, { useState, useEffect } from 'react'
import "./admintable.css"
import axios from 'axios'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
function AdServiceTable() {
const [serviceTable, setServicetable] = useState([])
const [Status, setstatus] = useState("")



    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 7 ;
    const pageCount = Math.ceil(serviceTable.length / itemsPerPage);
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = serviceTable.slice(startIndex, endIndex);
    const navigate = useNavigate()

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
      };
    const service = async(e)=>{
        try {
            
            const response = await axios.get("http://localhost:1102/api/admin/servicetable",{
              headers:
              {
                Authorization : "Bearer " + localStorage.getItem("admintoken")
              }
            })
        if(response){
            // console.log(response.data.data[0].user.name,"123")
            setServicetable(response.data.data)
        }else{
            toast.error("Error in receiving")
        }
        } catch (error) {
            console.log(error)
            toast.loading("something went wrong")
        }
    }

    const handleStatusUpdate=async(e,id)=>{
        const status = e.target.value
        console.log(status,"statat")
        const response =await axios.post(`http://localhost:1102/api/admin/updateservicetable/${id}`,{status:status},{
          headers:
          {
            Authorization : "Bearer " + localStorage.getItem("admintoken")
          }
        })
        if(response){
            console.log(response.data.data,"sa")
            setstatus(response.data.data)
        }
    }



    const handleLogout =()=>{
        localStorage.removeItem("admintoken")
    }

    useEffect(() => {
      service()
    }, [handleStatusUpdate])

  return (
  <>
    <div className="sidebar">
    <p>Admin Dashboard</p>
    <a href="/admin/home">Home</a>
    <a href="/admin/userlist">Users</a>
    <a  href="/admin/mechanics">Mechanic</a>
    <a href="/admin/mechanicservices">Mechanic service</a>
    <a className="active"  href="/admin/servicetable">Services</a>
    <a href="/admin/mechregistration">Add a mechanic</a>
    <a href="/admin/payment">Payments</a>
    <a href="" onClick={handleLogout}>Logout</a>
  </div>
  <div className="content">
    <div className="list " key="list">
    <ul key="ul">
         <li key="name">Name</li>
        <li key="email">Email </li>
        <li key="phone">Phone</li>
        <li key="address">Address</li>
        <li key="DOJ">Date</li>
        <li key="DOn">Completed on</li>
        <li key="action">Status</li>
        
      </ul>

{displayedData.map((e)=>(
      <ul >
         {/* <li key="name">{e.user[0].name} </li> */}
        <li key="numberplate">{e.user.name}</li>
        <li key="phone">{e.phone}</li>
        <li key="address">{e.address}</li>
        <li key="Service">{e.service}</li>
       <td>{new Date(e.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
       <td>{new Date(e.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
       <select value={e.status} onChange={(event)=>{handleStatusUpdate(event,e._id)}}>
            <option value="not done">Not Done</option>
            <option value="done">Done</option>
        </select>
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

export default AdServiceTable
