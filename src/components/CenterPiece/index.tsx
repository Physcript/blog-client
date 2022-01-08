
import React from 'react'
import { Container } from 'react-bootstrap'

export interface ICenterPiece {}
const CenterPiece: React.FunctionComponent<ICenterPiece> = props => {
    const { children } = props 
    return (
        <div>
            <Container
                style = {{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                    WebkitTransform: 'translate(-50%,-50%)'
                }}
                className = 'd-flex justify-content-center'
            >
                
                { children }

            </Container>
        </div>
    )
}

export default CenterPiece