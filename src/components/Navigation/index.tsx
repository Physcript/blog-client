

import React, { useContext } from 'react'
import UserContext from '../../context/auth/context'
import { Navbar,Container,NavbarBrand,Nav,Button } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { initialUserState } from '../../interfaces/user'
export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = props => {

    const Navi = useNavigate()
    const AuthContext = useContext(UserContext)
    const { user } = AuthContext.userState

    const logout = () => {
      AuthContext.userDispatch({ type: 'LOGOUT', payload: initialUserState })

    }

    return (
        <Navbar color = 'light' sticky = 'top' expand = 'md'>
            <Container>
                <NavbarBrand as = { Link } to = '/'>Emoji</NavbarBrand>
                <Nav className = 'mr-auto' navbar />
                { user._id === '' ?
                    <div className = 'd-flex'>
                        
                        <Navbar as = { Link }  to = '/login'>
                            Login
                        </Navbar>
                        <Navbar className = 'mx-2' />
                        <Navbar as = { Link }  to = '/register'>
                            Signup
                        </Navbar>


                    </div>
                :   
                    <div className = 'd-flex'>
                        <Button className = 'btn btn-sm' onClick = { () => Navi('/edit') }>
                            Post a blog
                        </Button>
                        <Navbar className = 'mx-2' />
                        <Button className = 'btn btn-sm' onClick = { () => logout() } >
                            Logout
                        </Button>
                    </div>
                }
            </Container>
        </Navbar>
    )
}

export default Navigation