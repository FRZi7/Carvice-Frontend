import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const mechtoken = localStorage.getItem("mechtoken")

function PublicMechRoute({children}) {
    if(mechtoken!=null){
        return <>
        {children}
        </>
    }
    else{
       return <Navigate to ={"/mechanic/login"}/>
    }
}

export default PublicMechRoute