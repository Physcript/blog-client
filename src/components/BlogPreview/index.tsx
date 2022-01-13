


import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export interface IBlogPreview {
    _id: string,
    title: string,
    headline: string,
    author: string,
    createdAt: string,
    updatedAt: string,
    content: string,
}

const BlogPreview: React.FunctionComponent<IBlogPreview> = props => {
    const { _id,title,content,headline,createdAt,updatedAt } = props
    return (
        <Card className = 'border-0'>
            <Card.Body className = 'p-0  '>
                <Link
                    to = { `/blog/${_id}` }
                    style = {{ textDecoration: 'none' }}
                    className = 'text-primary'
                > 
                    <h1><strong>{ title }</strong></h1>
                    <h3>{ headline }</h3> <br />
                    <p>{ content }</p>
                </Link>
                {
                    createdAt !== updatedAt ?
                        <p>Updated by: {  } at { new Date(updatedAt).toLocaleString() }</p>
                    :
                        <p>Posted by: {  } at { new Date(updatedAt).toLocaleString() }</p>
                }
                <hr />

            </Card.Body>
        </Card>
    )
}

export default BlogPreview