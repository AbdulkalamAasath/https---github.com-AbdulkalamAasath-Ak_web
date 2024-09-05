import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './Context/UserContext'; 
import { AdminContextProvider } from './Context/AdminContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
     <AdminContextProvider>
           <App />
     </AdminContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

