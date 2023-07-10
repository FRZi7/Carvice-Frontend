

   import React, { useEffect } from 'react';
   import { Navigate, useNavigate } from 'react-router-dom';
   const admintoken = localStorage.getItem("admintoken");
   const token = localStorage.getItem("token");
  const mechtoken = localStorage.getItem("mechtoken")
   
   function ProtectedAdminRoute({children}) {
      var navigate = useNavigate();
      useEffect(() => {
      if(admintoken){
         navigate("/admin/home")
      }
      else if (token){
         navigate("/");
      }else{
       navigate("/admin")
      }
   }, [admintoken, token, navigate]);
   return children
}
   export { ProtectedAdminRoute};

