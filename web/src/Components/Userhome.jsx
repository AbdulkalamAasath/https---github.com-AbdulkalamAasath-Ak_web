import React, { useEffect, useState } from 'react';
import { UseUserLogout } from '../Hooks/UseUserLogout';
import { UseUserContext } from '../Hooks/UseUserContext';

const UserHome = () => {
    const { logout } = UseUserLogout();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const { User } = UseUserContext();
    const[Data,setData] = useState([])
    const handleLogout = () => {
        logout();
    };

    const handleSubmit = async (e) => {
        const data = {
            Name: name,
            Email: email,
            Product_Name: productName,
            Product_Descrpition: productDescription,
            Address: address,
            Contact_Number: contactNumber,
            Customer_Address: companyAddress,
            Customer_Name: companyName
        };

        const response = await fetch(`http://localhost:4000/Ak_Web/UserAccess/postdata/${User.userid}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${User.token}`
            }
        });

        if (response.ok) {
            console.log('Data submitted successfully');
        } else {
            console.error('Failed to submit data');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/Ak_Web/UserAccess/getdata/${User.userid}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${User.token}`
              }
            });

            if (response.ok) {
                setData(await response.json())
            } else {
                console.error('Failed to fetch data');
            }
        };

        fetchData();
    }, [User]);
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='cn'>Name</label>
                    <input type='text' id='cn' value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor='pid'>Email</label>
                    <input type='text' id='cm' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor='cno'>Contact no</label>
                    <input type='text' id='cno' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

                    <label htmlFor="textbox">Address</label>
                    <textarea
                        id="textbox"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="5"
                        cols="30"
                    />

                    <label htmlFor='pna'>Product Name</label>
                    <input type='text' id='pna' value={productName} onChange={(e) => setProductName(e.target.value)} />

                    <label htmlFor="textbox">Product description</label>
                    <textarea
                        id="textbox"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows="5"
                        cols="30"
                    />

                    <label htmlFor='cna'>Company name</label>
                    <input type='text' id='cna' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

                    <label htmlFor='company address'>Company Address</label>
                    <input type='text' id='cad' value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />

                    <button type="submit">Submit</button>
                </form>
            </div>
            <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Product Name</th>
                    <th>Email</th>
                    <th>Approved</th>
                </tr>
            </thead>
            <tbody>
                {Data.length > 0 ? Data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.Name}</td>
                        <td>{item.Product_Name}</td>
                        <td>{item.Email}</td>
                        <td>{item.Approved ? <p>Approved </p>:<p>Pending</p>}</td>
                    </tr>
                )) : <h1>Data Not Available </h1>}
            </tbody>
        </table>
    
        </div>
    );
};

export default UserHome;
