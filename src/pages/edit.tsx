

import React,{ useContext, useEffect,useState } from 'react'
import IPageProps from '../interfaces/pages'
import { IEditBlogPage } from '../interfaces/blog'
import { useParams } from 'react-router-dom'
import UserContext from '../context/auth/context'
import Loading from '../components/Loading'
import { Container, FormGroup,Form,Button } from 'react-bootstrap'
import Navigation from '../components/Navigation'
import Header from '../components/Header'


const EditPage: React.FunctionComponent<IPageProps> = props => {

    const { user } = useContext(UserContext).userState
    const [ error,setError ] = useState('')
    const [ loading,setLoading ] = useState(true)
    const [ success,setSuccess ] = useState('')
    const [ blogInfo,setBlogInfo ] = useState<IEditBlogPage>({

        _id: '',
        title: '',
        content: '',
        headline: '',
        picture: '',
        createdAt: '',
        updatedAt: '',
        author: '',

    })

    let { blogID } = useParams() 

    useEffect(() => {

        if(blogID)
        {
            getBlog(blogID)
        }
        else
        {
            setLoading(false)
        }

    },[])

    const getBlog = async (id: string) => {

        const url = `https://blog-ts.herokuapp.com/api/blog/${id}`
        
        const request = new Request(url,{
            method: 'GET',
            headers: {'Content-type': 'application/json'},
            credentials: 'include',
        })

        try 
        {
            
            fetch(request)
                .then((res) => {
                    if(res.status === 200)
                    {
                        res.json().then((val) => {
                    

                            // fix author for update
                            if( user._id !== val.message.author)
                            {
                                setBlogInfo((val) => ({
                                    ...val,
                                    _id: ''
                                }))

                            }
                            else
                            {
                                setBlogInfo(val.message)
                            }


                        })
                    }else
                    {
                        res.json().then((val) => {
                            setError('Unable to retrieve blog')
                        })
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


    const createBlog = async () => {


        if( blogInfo.title === '' || blogInfo.content === ''  )
        {
            setError('Please fill up the form')
            setSuccess('')
            return null
        }
        setError('')
        setSuccess('')
        

        const url = 'https://blog-ts.herokuapp.com/api/blog/create'
        const data = {

        }


        const toJson = {
            title: blogInfo.title,
            picture: blogInfo.picture,
            headline: blogInfo.headline,
            content: blogInfo.content,
            author: user._id
        }

        const body = JSON.stringify(toJson)
        const token = document.cookie.split("=")[1]
        const request = new Request(url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', token } ,
            credentials: 'include',
            body
        })


        try 
        {

            fetch(request)
                .then((res) => {

                    if(res.status === 200)
                    {
                        res.json().then((val) => {
                            setSuccess('Blog created')
                            console.log(val)
                            setBlogInfo((blog) => ({
                                ...blog,
                                _id: val.message._id
                            }))
                        })
                    }
                    else 
                    {
                        setError('Unable to save blog')
                    }
                })


        }
        catch (error: any)
        {
            setError(error)
        }

        finally 
        {

            setLoading(false)

        }

    }


    const editBlog = async () => {
        if( blogInfo._id === '' || blogInfo.content === '' || blogInfo.headline === '' )
        {
            setError('Please fill up the form')
            setSuccess('')
            return null
        }
        setError('')
        setSuccess('')
        

        const url = `https://blog-ts.herokuapp.com/api/blog/update/${blogInfo._id}`
      
        //  PATCH NEED UPDATE ON USESTATE
        const toJson = {

            title: blogInfo.title,
            picture: blogInfo.picture,
            headline: blogInfo.headline,
            content: blogInfo.content,
            author: user._id
        }

        const body = JSON.stringify(toJson)

        const request = new Request(url,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body
        })

        try 
        {

            fetch(request)
                .then((res) => {

                    if(res.status === 200)
                    {
                        res.json().then((val) => {
                            setSuccess('Blog updated')
                            setBlogInfo((blog) => ({
                                ...blog,
                                _id: val.message._id
                            }))
                        })
                    }
                    else 
                    {
                        setError('Unable to update blog')
                    }
                })


        }
        catch (error: any)
        {
            setError(error)
        }

        finally 
        {

            setLoading(false)

        }

    }


    if(loading) 
    {
        return <Loading />
    }

    return (
        <Container className = 'fluid p-0'>
             <Navigation />
             <Header
                title={''} 
                headline= { blogInfo._id !== '' ? 'Edit your blog' : 'Create a blog' }             
             />
                <Container className = 'mt-5 mb-5'>
                    <p>{ error }</p>
                    <FormGroup>
                            <h2 className = 'text-success'>{ success }</h2>
                    </FormGroup> 
                    <Form>
                        <FormGroup className = 'd-flex flex-column gap-1' >
                            <label>Title *</label>
                            <input 
                                type = 'text'
                                name = 'title'
                                value = { blogInfo.title }
                                id = 'title'
                                placeholder = 'Enter title'
                                disabled = { loading }
                                onChange = { event => setBlogInfo((val => ({
                                    ...val,
                                    title: event.target.value
                                })))}
                            />
                        </FormGroup> 
                        <FormGroup className = 'd-flex flex-column gap-1'>
                            <label>Picture URL</label>
                            <input 
                                type = 'text'
                                name = 'picture'
                                value = { blogInfo.picture }
                                id = 'picture'
                                placeholder = 'Enter Picture'
                                disabled = { loading }
                                onChange = { event => setBlogInfo((val => ({
                                    ...val,
                                    picture: event.target.value
                                })))}
                            />
                        </FormGroup> 

                        <FormGroup className = 'd-flex flex-column gap-1'>
                            <label>Content *</label>
                            <textarea 
                                name = 'content'
                                value = { blogInfo.content }
                                id = 'content'
                                placeholder = 'Enter content'
                                disabled = { loading }
                                onChange = { event => setBlogInfo((val => ({
                                    ...val,
                                    content: event.target.value
                                })))}
                            />
                        </FormGroup> 
                       
                        <FormGroup className = 'mt-2'>
                            <Button 
                                className = 'block'
                                onClick = { () => {
                                    if( blogInfo._id !== '')
                                    {
                                        editBlog()
                                    }
                                    else 
                                    {
                                        createBlog()
                                    }
                                } }  
                                disabled = { loading }

                            >
                                { blogInfo._id !== '' ? 'update' : 'Post' }
                                 
                            </Button>


                        </FormGroup>
                    </Form>
                </Container>
        </Container>

    )
} 
export default EditPage