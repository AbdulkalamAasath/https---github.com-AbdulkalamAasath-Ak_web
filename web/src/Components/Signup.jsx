import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [Name,setName] = useState('')
    const [Email,setEmail] = useState('')
    const [showPassword,setShowPassword] = useState(false)
    const [password,setPassword] = useState('')
    const [PhNo,setPhNo]  = useState('')
    const navigate = useNavigate()
    const [Error,setError] = useState(null)
    const handleSubmit = async(e) =>
    {
        e.preventDefault()
        console.log(Name,Email,password,PhNo)
        const data = {name:Name,email:Email,password:password,phone:PhNo}
        const response = await fetch('http://localhost:4000/Ak_Web/User/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data )
        })
        if(response.ok)
        {
            window.alert("sign up completed")
            navigate('/')
            
        }
        if(!response.ok)
            {
                const json = await response.json()
                setError(json.error)

            }
    }
  return (
    <div>
      <form  onSubmit={(e) => handleSubmit(e)}>
        <label >Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={Name}
          required
        />
        <label >Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          required
        />
        <label>phone Number</label>
        <input
          type="text"
          onChange={(e) => setPhNo(e.target.value)}
          value={PhNo}
          required
        />
        <label >Set Password</label>
        <input
          type={showPassword ? 'text' : 'password'} // Toggle input type
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
         <input
            type="checkbox"
            id="showPassword"
            onChange={() => setShowPassword(!showPassword)}
            checked={showPassword}
          />
          <label htmlFor="showPassword" >
            Show Password
          </label>
        <button
          type="submit"
        >
            Submit
        </button>
        {Error && <div >{Error}</div>}
      </form>
    </div>
  )
}

export default Signup
