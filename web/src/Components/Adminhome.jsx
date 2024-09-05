import React, { useEffect, useState } from 'react'
import { UseAdminLogout } from '../Hooks/UseAdminLogut'
import { UseAdminContext } from '../Hooks/UseAdminContext'
const Adminhome = () => {
  const {logout} = UseAdminLogout()
  const {Admin} = UseAdminContext()
  const [Data,setData] = useState([])
  const [pData,setpData] = useState([])
  const [check,setCheck] = useState(false)
  const handelbtclick = async (value)=>{
    const response = await fetch(`http://localhost:4000/Ak_Web/Admin/getdata/${value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Admin.token}`
    }
  });
  if(response.ok)
  {
     setCheck(true)
     setpData(await response.json())
  }

  }
  const handelclick = () =>
  {
    logout()
  }
 
    useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(`http://localhost:4000/Ak_Web/Admin/getdata/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Admin.token}`
            }
          });

          if (response.ok) {
              setData(await response.json())
          } else {
              console.error('Failed to fetch data');
          }
      };

      fetchData();
  }, [Admin.userid]);
  const handelapprove = async(e,value) =>
  { 
    const response = await fetch(`http://localhost:4000/Ak_Web/Admin/updatedata/${value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Admin.token}`
    }
  }
);
console.log(response)

  }
  //Data.length > 0  ? Data.map((value,index) => (console.log(value._id))) : console.log("No DATA")
  return (
    <div>
    <div>
      <button onClick={handelclick}>Logout</button>
    </div>
    {!check && <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mail</th>
                    <th>Phone</th>
                    <th>view Info</th>
                </tr>
            </thead>
            <tbody>
                {Data.length > 0 ? Data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td><button onClick={() => handelbtclick(item._id)}>view info</button></td>
                    </tr>
                )) : <h1>Data Not Available </h1>}
            </tbody>
        </table>}
        {check && <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Product Name</th>
                    <th>Email</th>
                    <th>Approved</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {pData.length > 0 ? pData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.Name}</td>
                        <td>{item.Product_Name}</td>
                        <td>{item.Email}</td>
                        <td>{item.Approved ? <p>Approved </p>:<p>Pending</p>}</td>
                        <td>{!item.Approved ? <button onClick={(e)=>handelapprove(e,item._id)}>Approve</button> :<p> Approved </p>}</td>
                    </tr>
                )) : <h1>Data Not Available </h1>}
            </tbody>
        </table>}
  
    </div>
    
  )
}

export default Adminhome
