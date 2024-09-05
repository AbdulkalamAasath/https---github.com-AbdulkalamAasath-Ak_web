import { UseUserContext } from "./UseUserContext"
export const UseUserLogout = () =>
{
 const {dispatch} = UseUserContext() 
 const logout =() =>
 {
 localStorage.removeItem('User')
 dispatch({type:'LOGOUT'})
}
return({logout})
}
