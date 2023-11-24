
import { Route, Routes } from 'react-router-dom';
import "./App.css";

import Home from "./screens/Home"
import Admin from "./screens/Admin"
import Login from "./screens/Login"
import NotFound from "./screens/NotFound"
import SignUp from "./screens/SignUp"
import AdminSignUp from "./screens/Admin_SignUp"
import Validcert from "./screens/ValidCert"
import Addcert from "./screens/AddCert"
import Deletecert from "./screens/DeleteCert"
import PDF from "./screens/pdf"


function App() {
 
  return (
    <>
      <Routes> {/*For handling routes*/}
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/asignup' element={<AdminSignUp />}/>
        <Route path='/valid' element={<Validcert />}/>
        <Route path='/add' element={<Addcert />}/>
        <Route path='/delete' element={<Deletecert />}/>
        <Route path='/pdf' element={<PDF />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
    
  );
}

export default App;