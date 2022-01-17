

import React, { useState,useEffect,useContext } from 'react'
import { Card, Container, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import BlogPreview from '../components/BlogPreview'
import Loading from '../components/Loading'
import Navigation from '../components/Navigation'
import UserContext from '../context/auth/context'
import { IBlog, IEditBlogPage } from '../interfaces/blog'
import IPageProps from '../interfaces/pages'

const BlogPage: React.FunctionComponent<IPageProps> = props => {

    const Navi = useNavigate()

    let { blogID }  = useParams()
    const { user } = useContext(UserContext).userState
    const [ id,setId ] = useState<string>('')
    const [ blog,setBlog ] = useState<IBlog | null>(null)
    const [ dbutton,setDButton ] = useState<boolean>(true)

    const [ blogInfo,setBlogInfo ] = useState<IEditBlogPage>({

        _id: '',
        title: '',
        content: '',
        author: '',
        headline: '',
        picture: '',
        createdAt: '',
        updatedAt: '',

    })

    const [ error,setError ] = useState<string>('')
    const [ loading,setLoading ] = useState<boolean>(true)
 

    useEffect(() => {
        
        if ( blogID )
        {
            setId(blogID)
        }
        else 
        {
            Navi('/')
        }

    },[])

    useEffect(() => {
        if(id !== '')
        {
            getBlog()
        }
        else
        {

        }
    },[id])

    const getBlog = async () => {

        const url = `https://blog-ts.herokuapp.com/api/blog/${id}`

        const request = new Request(url,{
            method: 'GET',
            headers: {'Content-type': 'application/json' },
            credentials: 'include',
        })

        try 
        {
            
            fetch(request) 
                .then((res) => {
                    if(res.status === 200)
                    {
                        res.json().then((val) => {
                    
                            setBlogInfo(val.message)
                            
                        })
                    }else
                    {
                        res.json().then((val) => {
                            setError('Unable to retrieve blog')
                        })
                        Navi('/')
                    }
                })
                .catch((error) =>{
                    console.log(error)

                })

        }
        catch (error)
        {
            
        }

        finally 
        {
            setLoading(false)

        }
    }


    const deleteBlog = () => {

     
        if(user._id !== blogInfo._id) 
        {
            return 
        }
        
        const url = `https://blog-ts.herokuapp.com/api/blog/${id}`
        const token = document.cookie.split("=")[1]

        const request = new Request(url,{
            method: 'DELETE',
            headers: {'Content-type': 'application/json',token},
            credentials: 'include',
        })

        try 
        {
            fetch(request)
                .then((res) => {
                    if(res.status === 200)
                    {
                        Navi('/')
                    }
                    else
                    {
                        setError('Unable to delete blog')
                    }
                })
        }
        catch (error)
        {
            setError('Unable to delete blog')
        }
        finally 
        {
            setLoading(false)
        }

    }


        
    if(loading)
    {
        return (
            <Loading />
        ) 
    }

    return (
        <Container>
            <Navigation />
            <BlogPreview 
                _id={blogInfo._id}
                title={blogInfo.title}
                headline={blogInfo.headline}
                createdAt={blogInfo.createdAt}
                updatedAt={blogInfo.createdAt}
                content={blogInfo.content} 
                author={ blogInfo.author } 
                picture={ blogInfo.picture } />


            { user._id === blogInfo.author ? 
                <div>
                    <Button className = 'btn btn-danger' onClick = { deleteBlog } disabled = { dbutton } >
                        Delete
                    </Button>
                </div>
            :
                <div>

                </div> 
                }
        </Container>
    )
} 
export default BlogPage