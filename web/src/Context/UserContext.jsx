import { createContext,useReducer,useEffect } from "react";
export const UserContext = createContext()

const authreducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {User:action.payload}
        case 'LOGOUT':
           return  {User:null}   
        default:
            return state
    }
}
export const UserContextProvider = ({children}) =>
{
    useEffect(() => {
        const User = JSON.parse(localStorage.getItem('User'))
        console.log(User)
        if(User)
        {
            dispatch({type:'LOGIN',payload:User})
        }
    },[])
   const [state,dispatch] = useReducer(authreducer,{
    User:null
   })
   console.log('DeanAuthContext',state)
   return(
    <UserContext.Provider value={{...state,dispatch}}>
        {children}
    </UserContext.Provider>
   )
}