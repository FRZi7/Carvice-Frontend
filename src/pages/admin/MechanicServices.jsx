import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import ReactPaginate from 'react-paginate';


function MechanicServices() {
const [MechanicService, setMechanicservice] = useState([])
const [mechanicList, setMechaniclist] = useState([])
const [mech,setMech] = useState([])


const [pageNumber, setPageNumber] = useState(0);
const itemsPerPage = 7 ;
const pageCount = Math.ceil(MechanicService.length / itemsPerPage);
const startIndex = pageNumber * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedData = MechanicService.slice(startIndex, endIndex);


const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
    };
    
const mechService = async()=>{
        try {
            const response = await axios.get("http://localhost:1102/api/admin/getmechanic",{
                headers:
                {
                  Authorization : "Bearer " + localStorage.getItem("admintoken")
                }
              })
            if(response){
                setMechanicservice(response.data.data)
            }
        } catch (error) {
          console.log(error)
            toast.loading("something went wrong")
        }  
    }

const handleLogout = () => {
        localStorage.removeItem("admintoken")
    }

const mechdetails=async()=>{
        try {
          const response = await axios.get("http://localhost:1102/api/admin/mechaniclist",{
            headers:
            {
              Authorization : "Bearer " + localStorage.getItem("admintoken")
            }
          })
          setMechaniclist(response.data.data)
        } catch (error) {
          toast.error("something went wrong")
        }
    }

const handleDoneStatus = async(status,id)=>{
  const changeStatus = status.target.value
  const response = await axios.post(`http://localhost:1102/api/admin/getdone/${id}`,{status:changeStatus},{
    headers:{
      Authorization : "Bearer "+ localStorage.getItem("admintoken")
    }
  })
  if(response){
    setTimeout(()=>{
      toast.success(response.data.message) //incase if the mechanic changes the done status but the admin's part aint gettin' updated, use the default thingy.
    },1000)
   
  }
    }

const handleMechanics=async(e,id)=>{
        try {
            console.log(id,"qre")
            const assign = e.target.value
            console.log(assign,"assign")
            const response = await axios.post(`http://localhost:1102/api/admin/assignmechanic/${id}`,{status:assign},{

                headers:
                {
                  Authorization : "Bearer " + localStorage.getItem("admintoken")
                }
              })
            if(response){
               toast.success("successfully assigned")
            }
        } catch (error) {
            console.log(error)
        }

    }

useEffect(() => {
    mechService()
    mechdetails()
}, [handleDoneStatus])


  return (
    <>
    <div className="sidebar">
    <p>Admin Dashboard</p>
    <a href="/admin/home">Home</a>
    <a routerlink="/admin/userlist">Users</a>
    <a href="/admin/mechanics">Mechanic</a>
    <a className="active"  href="/admin/mechanicservices">Mechanic service</a>
    <a href="/admin/mechregistration">Add a mechanic</a>
    <a href="/admin/servicetable">Services</a>
    <a href="/admin/plans">Payments</a>
    <a href="" onClick={handleLogout}>Logout</a>
    </div>

    <div className="content">
        <div className="list " key="list">
        <ul key="ul">
        <li key="name">Name</li>
        <li key="phone">Phone</li>
        <li key="address">Address</li>
        <li key="Issues">Issues</li>
        <li key="Mi">Mechanic issued</li>
        <li key="Io">Issued on</li>
        {/* <li key="DOC">Completed on</li> */}
        <li key="action">Status</li>
        </ul>
    {displayedData.map((f)=>(
        <ul key="ulokaybwoi">
        <li key="name">{f.user.name}</li>
        <li key="phone">{f.phone}</li>
        <li key="address">{f.address}</li>
        <li key="issue">{f.issue}</li>
        <select onChange={(event)=>{handleMechanics(event,f._id)}}>
            <option selected disabled>{f.Mechanic_issued?.name}</option>
        {mechanicList.map((e)=>(
            <option value={e._id} >{e.name}</option> 
            ))}
        </select>
        <li>{new Date(f.createdAt).toLocaleDateString()}</li>
        {/* <li>{new Date(e.updatedAt).toLocaleDateString()}</li> */}
        <li key="action">
        <select value={f.status} onChange={(event)=>{handleDoneStatus(event,f._id)}}>
            <option value="done">Done</option> 
            <option value="not done">Not done</option> 
        </select>
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

export default MechanicServices