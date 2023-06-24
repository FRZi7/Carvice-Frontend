import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute(props) {
    if(localStorage.getItem("token")){
      return props.children
    //   console.log(props.children)
    }else{
        return <Navigate to={"/login"}/>
    }
}

export default ProtectedRoute