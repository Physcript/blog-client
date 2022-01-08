

import React from 'react'
import { Navbar,Container,NavbarBrand, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = props => {
    return (
        <Navbar color = 'light' sticky = 'top' expand = 'md'>
            <Container>
                <NavbarBrand as = { Link } to = '/'>Emoji</NavbarBrand>
                <Nav className = 'mr-auto' navbar />
            </Container>
        </Navbar>
    )
}

export default Navigation