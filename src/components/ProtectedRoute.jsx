import React from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const admintoken = localStorage.getItem("admintoken")
const token = localStorage.getItem("token")

function ProtectedRoute(props) {
  const navigate = useNavigate()
  useEffect(()=>{
    if(token){
      // return props.children
    }else if(admintoken){
       navigate("/admin/home")
    }else{
      console.log("asdasdasd")
      navigate("/")
    }
  },[token,admintoken,navigate])
  return props.children
}

function ProtectedRoute2(props) {
  const navigate = useNavigate()
  useEffect(()=>{
    if(token){
      // return props.children
    }else if(admintoken){
       navigate("/admin/home")
    }else{
      console.log("asdasdasd")
      navigate("/login")
    }
  },[token,admintoken,navigate])
  return props.children
}

function ProtectedRoute3(props) {
  if (!token) {
    return <Navigate to = {"/login"}/>
  }
  return props.children;
}
export { ProtectedRoute, ProtectedRoute2, ProtectedRoute3};
