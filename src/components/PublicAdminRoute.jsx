import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const admintoken = localStorage.getItem("admintoken")

function PublicAdminRoute({children}) {
    if(admintoken!=null){
        return <>
        {children}
        </>
    }
    else{
       return <Navigate to ={"/admin"}/>
    }

// return children   
}

export default PublicAdminRoute