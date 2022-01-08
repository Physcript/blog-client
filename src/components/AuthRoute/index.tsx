import React,{ useContext } from 'react'
import UserContext from '../../context/auth/context'
import { Navigate } from 'react-router-dom'
export interface IAuthRoute {}

const AuthRoute: React.FunctionComponent<IAuthRoute> = props => {
    const { children } = props
    const { user } = useContext(UserContext).userState
 
    if( user._id == '')
    {
        console.log('Unauthorized')
        return <Navigate to ='/login' />
    }
    console.log('asd')
    return (
        <>
            { children }
        </>
    )
}

export default AuthRoute