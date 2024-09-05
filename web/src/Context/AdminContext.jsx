import { createContext,useReducer,useEffect } from "react";
export const AdminContext = createContext()

const authreducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {Admin:action.payload}
        case 'LOGOUT':
           return  {Admin:null}   
        default:
            return state
    }
}
export const AdminContextProvider = ({children}) =>
{
    useEffect(() => {
        const Admin = JSON.parse(localStorage.getItem('Admin'))
        if(Admin)
        {
            dispatch({type:'LOGIN',payload:Admin})
        }
    },[])
   const [state,dispatch] = useReducer(authreducer,{
    Admin:null
   })
   return(
    <AdminContext.Provider value={{...state,dispatch}}>
        {children}
    </AdminContext.Provider>
   )
}