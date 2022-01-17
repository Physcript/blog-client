

import React, { useState,useEffect } from 'react'
import IPageProps from '../interfaces/pages'
import Navigation from '../components/Navigation'
import Header from '../components/Header'

import { Container } from 'react-bootstrap'
import { IBlog } from '../interfaces/blog'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import BlogPreview from '../components/BlogPreview'
import IUser from '../interfaces/user'

const HomePage: React.FunctionComponent<IPageProps> = props => {
    
    const [ blog,setBlog ] = useState<IBlog[]>([])
    const [ loading,setLoading ] = useState<boolean>(true)
    const [ error,setError ] = useState<string>('')

    useEffect(() => { 
        GetAllBlog() 
    },[])


    const GetAllBlog = async () => {

        const url = 'https://blog-ts.herokuapp.com/api/blog'
        
        const request = new Request (url,{
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }

        })

        try

        {
            fetch(request)
                .then((res) => {
                    if(res.status === 200)
                    {
                        res.json().then( (val) => {
                            console.log(val)
                            let blogs = val.message
                            blogs.sort((x: any,y: any) => y.updatedAt.localeCompare(x.updatedAt))
                            setBlog(blogs)
                        } )
                    }
                    else 
                    {
                        res.json().then( (val) => {
                            setError('Unable to retrieve blog')
                        })
                    }  
                })
        }
        catch 
        {
            setError('Unable to retrieve blog')
        }
        finally 
        {
            setLoading(false)
        }
    }

    if( loading )

    {
        return <Loading />
    }



    return (
        <div>
            <Navigation />
            <Header title={'Blog'} headline={' Off the week'} />
            <Container className = 'mt-5'>
                { blog.length === 0 && <p>There is no blog. Create <Link to = '/edit'>Post here</Link></p> }
                { blog.map((blog,index) => {
                    return (
                        <div key = { index }>
                            <BlogPreview 
                                _id={blog._id}
                                title={blog.title}
                                headline={blog.headline}
                                content = {blog.content}
                                createdAt={blog.createdAt}
                                updatedAt={blog.updatedAt} 
                                author={''}   
                                picture={ blog.picture }                       
                            />
                        </div>
                    )   
                })}
            </Container>
        </div>
       
    )
} 
export default HomePage