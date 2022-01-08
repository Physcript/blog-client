import React, { useContext, useReducer,useState,useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import routes from './config/routes'
import { reducer } from './context/auth/reducer'
import { initialUserState } from './interfaces/user'
import Loading from './components/Loading'
import { isIfStatement } from 'typescript'
import AuthRoute from './components/AuthRoute'

export interface IApplicationProps {}


const Application: React.FunctionComponent< IApplicationProps > = props => {
    const [ userState,userDispatch ] = useReducer(reducer,initialUserState)
    const [ loading,setLoading ] = useState<boolean>(true)

    /** Debugging */
    const [ authState,setAuthStage ] = useState<string>('Checking localstorage')

    useEffect(() => {
        setTimeout(() => {
            checkStorageForCredentials()
        },1000)
    },[])

    const checkStorageForCredentials = () => {
        setAuthStage('Checking Credentials')
        const token = localStorage.getItem('token')
        if(token === null) 
        {
            userDispatch({ type: 'LOGOUT' , payload: initialUserState })
            setAuthStage('No credential found')

            setTimeout(() => {
                setLoading(false)
            },1000)
        }
        else 
        {
            setAuthStage('Credential found, validating')

            setTimeout(() => {
                setLoading(false)
            },1000)
        }
        
    }

    const userContextValue = {
        userState,
        userDispatch
    }

    if(loading) 
    {
        return <Loading />
    }

    return (
        <Routes>
           
            { routes.map((route,index) => {
                if(route.auth) 
                {
                    return (
                       
                        <Route
                            key = { index }
                            path = { route.path }
                            element = { 
                                <AuthRoute>
                                    <route.component />
                                </AuthRoute>
                                }
                        />
                     
                    )
                }
                return (
                    
                    <Route
                        key = { index }
                        path = { route.path }
                        element = { <route.component /> }
                    />
                )
            })}
        </Routes>
    )
}

export default Application