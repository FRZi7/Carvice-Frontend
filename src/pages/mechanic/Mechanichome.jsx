import React, { useEffect, useState } from 'react'
import "./MechanicService.css"
import axios from '../../axios/axios'
import jwt_decode from "jwt-decode";
import ReactPaginate from 'react-paginate';
import { toast } from 'react-hot-toast';


function Mechanichome() {
  const [mechWork, setMechWork] = useState([])
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
      const works = await axios.get(`/api/mechanic/getmechworks/${mechId}`,{
        headers:{
          Authorization : "Bearer " + localStorage.getItem("mechtoken")
        }
      })
      if(works){
        setMechWork(works.data.data)
      }
    } catch (error) {
      toast.loading("something went wrong")
    }
  }

  const handlePaymentInput = async (e, id) => {
    try {
      if (e.keyCode === 13) {
        const payment = e.target.value;
        const amount = await axios.post(`/api/mechanic/amount/${id}`,{amount:payment})
        if(amount){
          toast.success("amount updated")
        }
      }
    } catch (error) {
      toast.loading("Something went wrong")
    }
    
  };

  const handleDoneInput=async(e,id)=>{
    try {
      const status = e.target.value
      const response = await axios.post(`/api/mechanic/changestatus/${id}`,{status:status},{
        headers:{
          Authorization: "Bearer "+localStorage.getItem("mechtoken")
        }
        })
        if(response){
          toast.success(response.data.message)
        }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  
  const handleLogout = () =>{
    localStorage.removeItem("mechtoken")
  }

  useEffect(() => {
    mechanicWorks()
  }, [handleDoneInput])
  
  return (
    
    <>
    <div className="sidebar">
    <p>Mechanic Dashboard</p>
    <a className="active" href="/mechanic/services">Services</a>
    <a href="/admin/plans">Payments</a>
    <a href="/mechanic/login" onClick={handleLogout}>Logout</a>
    </div> 
    <div className="content">
        <div className="list " key="liss ">
        <ul key="ul">
        <li key="x">Name</li>
        <li key="phone">Phone</li>
        <li key="address">Address</li>
        <li key="Issues">Issues</li>
        <li key="Io">Issued on</li>
        <li key="Com">Completed on</li>
        <li key="Co">Payment</li>
        <li key="action">Status</li>
        </ul>
    {displayedData.map((e)=>(
        <ul>
        <li key="ename">{e?.name}</li>
        <li key="ephone">{e?.phone}</li>
        <li key="eaddress">{e?.address}</li>
        <li key="eissue">{e?.issue}</li>
        <li>{new Date(e?.createdAt).toLocaleDateString()}</li>
        <li>{new Date(e?.updatedAt).toLocaleDateString()}</li>
        <li key="epayment">
          <input
          type='number'
          defaultValue={e?.payment}
          onKeyDown={(event) => handlePaymentInput(event, e._id)}
          />
        </li>
        <li key="eaction">
        <select value={e?.status} onChange={(event)=>{handleDoneInput(event,e?._id)}} >
            <option value="edone">Done</option> 
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

export default Mechanichome