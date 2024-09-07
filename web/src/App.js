import Loginpage from "./Components/Loginpage";
import Userhome from "./Components/Userhome";
import Adminhome from "./Components/Adminhome";
import { UseUserContext } from "./Hooks/UseUserContext";
import { UseAdminContext } from "./Hooks/UseAdminContext";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from "./Components/Signup";

function App() {
  const { User } = UseUserContext();
  console.log(User);
  const { Admin } = UseAdminContext();
  console.log(Admin);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={!Admin && !User ? <Loginpage /> : <Navigate to='/Adminpage' />}></Route>
          <Route path='/Adminpage' element={Admin ? <Adminhome/> : <Navigate to='/Userpage'/>}></Route>
          <Route path='/Userpage' element={User ? <Userhome/> :<Navigate to ='/'/>}></Route>
          <Route path='/User/Signup' element={!User ? <Signup /> :<Navigate to ='/'/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
