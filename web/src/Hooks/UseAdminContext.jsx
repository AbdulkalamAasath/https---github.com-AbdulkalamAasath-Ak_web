import {AdminContext} from '../Context/AdminContext'
import { useContext } from 'react'


export const UseAdminContext = () =>
{
    const context = useContext(AdminContext)
    if(!context)
    {
        throw Error("Error in AdminContext")
    }
    return context
}