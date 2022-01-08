

import React from 'react'
import IPageProps from '../interfaces/pages'
import Navigation from '../components/Navigation'
import Header from '../components/Header'

import { Container } from 'react-bootstrap'

const HomePage: React.FunctionComponent<IPageProps> = props => {
    return (
        <div>
            <Navigation />
            <Header title={'Blog'} headline={' Off the week'} />
            <Container className = 'mt-5'>
                Blog stuff
            </Container>
        </div>
       
    )
} 
export default HomePage