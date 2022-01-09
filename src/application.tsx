import React, { useContext, useReducer,useState,useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import routes from './config/routes'
import { reducer } from './context/auth/reducer'
import { initialUserState } from './interfaces/user'
import Loading from './components/Loading'
import { collapseTextChangeRangesAcrossMultipleVersions, isIfStatement } from 'typescript'
import AuthRoute from './components/AuthRoute'
import { UserContextProvider } from './context/auth/context'
import { validate } from './modules/auth'

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
        const AuthToken = document.cookie.split(';')[0]
        const Token = AuthToken.split('=')[1]

        if(Token === null) 
        {
            userDispatch({ type: 'LOGOUT' , payload: initialUserState })
            setAuthStage('No credential found')

            setTimeout(() => {
                setLoading(false)
            },1000)
        }
        else 
        {   
            validate( (error, user) => {
                if( error )
                {
                    console.log('Invalid Token')
                    setLoading(false)
                }
                else 
                {   
                    userDispatch({type:'LOGIN', payload: user.message})
                    setLoading(false)
                }
            } ) 
  
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
        <UserContextProvider value = { userContextValue }>
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
        </UserContextProvider>
    )
}

export default Application