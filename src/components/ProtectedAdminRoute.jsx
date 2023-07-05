// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'


// function ProtectedAdminRoute() {
//     const navigate = useNavigate()
//     const admintoken = localStorage.getItem("admintoken")
//     const token = localStorage.getItem("token")
//  if(admintoken){
//    useEffect(()=>{
//       navigate("/admin/home",{replace:true})
//       return true
//    },[])
      
//  }else if(token){
//     useEffect(() => {
//       navigate("/",{replace:true})
//    }, [])
//  }
//  else{
//    return false
//  }
// }
// export default ProtectedAdminRoute

   import React, { useEffect } from 'react';
   import { useNavigate } from 'react-router-dom';

   function ProtectedAdminRoute({children}) {
   const navigate = useNavigate();
   const admintoken = localStorage.getItem("admintoken");
   const token = localStorage.getItem("token");
   useEffect(() => {
      if(admintoken){
         navigate("/admin/home")
      }else if (token){
         navigate("/");
      }else{
       navigate("/admin")
      }
   }, [admintoken, token, navigate]);
   return children
   }

   export default ProtectedAdminRoute;

