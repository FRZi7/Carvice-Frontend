import React from 'react'
import "../admin/admintable.css"

function Mechanichome() {

  const handleLogout = () =>{
    localStorage.removeItem("mechtoken")
  }
  return (
    
    <>
    <div className="sidebar">
    <p>Mechanic Dashboard</p>
    <a className="active" href="/mechanic/home">Home</a>
    {/* <a routerlink="/mech/kids">Users</a> */}
    <a href="/mechanic/services">Services</a>
    <a href="/admin/plans">Payments</a>
    <a href="/mechanic/login" onClick={handleLogout}>Logout</a>
    </div > 
    </>
  )
}

export default Mechanichome