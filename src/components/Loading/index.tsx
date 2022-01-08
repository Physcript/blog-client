import React from 'react'
import { Spinner, Card } from 'react-bootstrap'
import CenterPiece from '../CenterPiece'

export interface ILoadingProps {}

const LoadingComponent: React.FunctionComponent<ILoadingProps> = props => {
    return (
        <div className = 'text-center'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

const Loading: React.FunctionComponent<ILoadingProps> = props => {
    return (
        <CenterPiece>
            <Card>
                <Card.Body>
                    <LoadingComponent />
                </Card.Body>
            </Card>
        </CenterPiece>
    )
}
export default Loading