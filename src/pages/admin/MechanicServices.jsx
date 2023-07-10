import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import ReactPaginate from 'react-paginate';


function MechanicServices() {
    const [MechanicService, setMechanicservice] = useState([])
    const [mechanicList, setMechaniclist] = useState([])
    console.log(mechanicList,"1e")
    console.log(MechanicService,"gigigigi")

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
            toast.loading("something went wrong")
        }
       
    }

    useEffect(() => {
        mechService()
        mechdetails()
    }, [])
    
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
          console.log(response.data.data,"q")
          setMechaniclist(response.data.data)
        } catch (error) {
          toast.error("something went wrong")
        }
      }

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
    {displayedData.map((e)=>(
        <ul key="ul2">
        <li key="name">{e.user.name}</li>
        <li key="phone">{e.phone}</li>
        <li key="address">{e.address}</li>
        <li key="issue">{e.issue}</li>
        <select onChange={(event)=>{handleMechanics(event,e._id)}}>
        {mechanicList.map((e)=>(
            <option>{e.name}</option> 
            ))}
        </select>
        <li>{new Date(e.createdAt).toLocaleDateString()}</li>
        {/* <li>{new Date(e.updatedAt).toLocaleDateString()}</li> */}
        <li key="action">
        <select>
            <option>Done</option> 
            <option>Not done</option> 
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