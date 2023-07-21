
import Home from "../src/pages/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { Toaster } from 'react-hot-toast'
import PublicRoute from './components/PublicRoute'
import Bookcarwash from './pages/bookcarwash'
import Success from './pages/Success'
import Bookmechanic from './pages/Bookmechanic'
import Edituser from './pages/Edituser'
import Forgotpassword from './pages/Forgotpassword'
import Otp from './pages/otp'
import Adminloginpage from './pages/admin/Adminloginpage'
import {ProtectedAdminRoute} from "./components/ProtectedAdminRoute"
import Adminhome from './pages/admin/Adminhome'
import { ProtectedRoute,ProtectedRoute2,ProtectedRoute3} from "./components/ProtectedRoute"
import AdminMechanicList from "./pages/admin/AdminMechanicList"
import PublicAdminRoute from "./components/PublicAdminRoute"
import MechRegistration from "./pages/admin/MechRegistration"
import AdminUserList from "./pages/admin/AdminUserList"
import Mechaniclogin from "./pages/mechanic/Mechaniclogin"
import Mechanichome from "./pages/mechanic/Mechanichome"
import ProtectedMechRoute from "./components/ProtectedMechRoute"
import PublicMechRoute from "./components/PublicMechRoute"
import AdServiceTable from "./pages/admin/AdServicetable"
import MechanicServices from "./pages/admin/MechanicServices"
import Errorpage from "./pages/Errorpage"




function App() {
  return (

   <BrowserRouter>
   <Toaster position="top-center" reverseOrder={false}/>
   <Routes>
    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>  
    <Route path="/login" element={<ProtectedRoute2><Login/></ProtectedRoute2>}/>
    <Route path="/userregister" element={<PublicRoute><Registration/></PublicRoute>}/>
    <Route path="/bookcarwash" element={<ProtectedRoute3><Bookcarwash/></ProtectedRoute3>}/>
    <Route path='/mechanic' element={<ProtectedRoute3><Bookmechanic/></ProtectedRoute3>}/>
    <Route path='/edituser' element={<ProtectedRoute3><Edituser/></ProtectedRoute3>}/>
    <Route path='/otp' element={<Otp/>}/>
    <Route path='/forgotpassword' element={<Forgotpassword/>}/>
    <Route path='/success' element={<Success/>}/>
    <Route path='/admin' element={<ProtectedAdminRoute><Adminloginpage/></ProtectedAdminRoute>}/>
    <Route path='/admin/home' element={<ProtectedAdminRoute><Adminhome/></ProtectedAdminRoute>}/>
    <Route path='/admin/mechanics' element={<PublicAdminRoute><AdminMechanicList/></PublicAdminRoute>}/>
    <Route path='/admin/mechregistration' element={<PublicAdminRoute><MechRegistration/></PublicAdminRoute>}/>
    <Route path='/admin/userlist' element={<PublicAdminRoute><AdminUserList/></PublicAdminRoute>}/>
    <Route path='/admin/servicetable' element={<PublicAdminRoute><AdServiceTable/></PublicAdminRoute>}/>
    <Route path='/admin/mechanicservices' element={<PublicAdminRoute><MechanicServices/></PublicAdminRoute>}/>
    <Route path='/mechanic/login' element={<ProtectedMechRoute><Mechaniclogin/></ProtectedMechRoute>}/>                     
    <Route path='/mechanic/home' element={<ProtectedMechRoute><Mechanichome/></ProtectedMechRoute>}/>                     
    <Route path='*'element={<Errorpage/>}/>
    


   </Routes>
   </BrowserRouter>

  )
}

export default App
