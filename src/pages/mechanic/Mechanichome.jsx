import React, { useEffect, useState } from 'react'
import "./MechanicService.css"
import axios from 'axios'
import jwt_decode from "jwt-decode";
import ReactPaginate from 'react-paginate';


function Mechanichome() {
  const [mechWork, setMechWork] = useState([])
  console.log(mechWork)
  
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 7 ;
  const pageCount = Math.ceil(mechWork.length / itemsPerPage);
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = mechWork.slice(startIndex, endIndex);
  
  const mechanicWorks = async(e)=>{
    try {
      const token = localStorage.getItem("mechtoken")
      const tokenId = jwt_decode(token)
      const mechId = tokenId.mechanicid
      console.log(mechId,"id")
      const works = await axios.get(`http://localhost:1102/api/mechanic/getmechworks/${mechId}`,{
        headers:{
          Authorization : "Bearer " + localStorage.getItem("mechtoken")
        }
      })
      if(works){
        console.log(works.data.data)
        setMechWork(works.data.data)
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  
  const handleLogout = () =>{
    localStorage.removeItem("mechtoken")
  }

  useEffect(() => {
    mechanicWorks()
  }, [])
  
  return (
    
    <>
    <div className="sidebar">
    <p>Mechanic Dashboard</p>
    <a className="active" href="/mechanic/services">Services</a>
    <a href="/admin/plans">Payments</a>
    <a href="/mechanic/login" onClick={handleLogout}>Logout</a>
    </div> 
    <div className="content">
        <div className="list " key="list">
        <ul key="ul">
        <li key="name">Name</li>
        <li key="phone">Phone</li>
        <li key="address">Address</li>
        <li key="Issues">Issues</li>
        <li key="Io">Issued on</li>
        <li key="action">Status</li>
        </ul>
    {displayedData.map((e)=>(
        <ul key="ulokaybwoi">
        <li key="name">{e?.name}</li>
        <li key="phone">{e?.phone}</li>
        <li key="address">{e?.address}</li>
        <li key="issue">{e?.issue}</li>
        <li>{new Date(e?.createdAt).toLocaleDateString()}</li>
        {/* <li>{new Date(e.updatedAt).toLocaleDateString()}</li> */}
        <li key="action">
        {/* <select onChange={change the status and make sure the admin side is done automatically} > */}
            <option value="done">Done</option> 
            <option value="not done">Not done</option> 
        {/* </select> */}
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

export default Mechanichome