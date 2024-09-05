import React, { useState } from 'react';
import { UseAdminLogin } from '../Hooks/UseAdminLogin';
import { UseUserLogin } from '../Hooks/UseUserLogin';
import { UseUserLogout } from '../Hooks/UseUserLogout';
const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const {Adminlogin,error,isLoading} = UseAdminLogin()
  const {Userlogin,usererror,userisLoading} = UseUserLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(type == "Admin")
    {
      console.log("Admin") 
      await Adminlogin(email,password)  
        
    }
    else if(type == "User")
    {
      await Userlogin(email,password)
    }
    
  };

  return (
    <div className='body-log'>
      <main className="container-log">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className='log-form'>
          <div>
            <label htmlFor="user">Select Usertype</label>
            <select
              id="user"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="underline"></div>
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="underline"></div>
          </div>
          <input type="submit" value="Login" />
        </form>
      </main>
      {error && <div >{error}</div>}
      {usererror && <div >{usererror}</div>}
    </div>
  );
};

export default Loginpage;
