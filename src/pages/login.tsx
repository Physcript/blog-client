

import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CenterPiece from '../components/CenterPiece'
import UserContext from '../context/auth/context'
import IPageProps from '../interfaces/pages'

import Login from '../components/Login'
import Register from '../components/Register'

const LoginPage: React.FunctionComponent<IPageProps> = props => {
    const [ authenticating,setAuthenticating ] = useState<boolean>(false)
    const [ error,setError ] = useState<string>('')

    const userContext = useContext(UserContext)
    const Navi = useNavigate()
    const isLogin = window.location.pathname.includes('login')

    if(isLogin)
    {
        return (
            <div>
                <Container>
                    <CenterPiece>
                        <Login />
                    </CenterPiece>
                </Container>
            </div>
        )
    }
    return (
      <div>
          <Container>
              <CenterPiece>
                <Register />
              </CenterPiece>
          </Container>
      </div>
    )
} 
export default LoginPage