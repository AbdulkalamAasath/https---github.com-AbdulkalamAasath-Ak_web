import { UseAdminContext } from "./UseAdminContext"
export const UseAdminLogout = () =>
{
 const {dispatch} = UseAdminContext() 
 const logout =() =>
 {
 localStorage.removeItem('Admin')
 dispatch({type:'LOGOUT'})
}
return({logout})
}
