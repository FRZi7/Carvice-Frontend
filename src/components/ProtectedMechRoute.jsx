

import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const token = localStorage.getItem("token");
const admintoken = localStorage.getItem("admintoken");
const mechtoken = localStorage.getItem("mechtoken")

function ProtectedMechRoute({children}) {
   var navigate = useNavigate();
   useEffect(() => {
   if(mechtoken){
      navigate("/mechanic/home")
   }
   else if(admintoken){
    navigate("/admin/home")
   }  
   else if (token){
      navigate("/");
   }else{
    navigate("/mechanic/login")
   }
}, [mechtoken, token, admintoken, navigate]);
return children
}
export default ProtectedMechRoute

