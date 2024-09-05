import {UserContext} from '../Context/UserContext'
import { useContext } from 'react'


export const UseUserContext = () =>
{
    const context = useContext(UserContext)
    if(!context)
    {
        throw Error("Error in UserContext")
    }
    return context
}