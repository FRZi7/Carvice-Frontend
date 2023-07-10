import React from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const admintoken = localStorage.getItem("admintoken")
const token = localStorage.getItem("token")

function ProtectedRoute(props) {
  console.log("protected route")
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
  console.log("AQER protected route 2")
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
  console.log("protected route 3")
  if (!token) {
    return <Navigate to = {"/login"}/>
  }
  return props.children;
}
export { ProtectedRoute, ProtectedRoute2, ProtectedRoute3};
