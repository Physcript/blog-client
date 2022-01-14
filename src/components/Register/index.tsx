
import React, { useState } from 'react'
import { Button, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading'

export interface IRegister {}
const Register: React.FunctionComponent<IRegister> = props => {

    const Navi = useNavigate()

    const [ regData,setRegData ] = useState({

        name: '',
        email: '',
        password: '',
        confirmPassword: ''

    })

    const [ loading,setLoading ] = useState<boolean>(false)
    const [ error,setError ] = useState<any>()
    const [ success,setSuccess ] = useState<string>('')

    const registerHandler = () => {
        setLoading(true)
        const url = 'http://localhost:1337/api/create'
        const myData = {
            "name": regData.name,
            "email": regData.email,
            "password": regData.password,
            "confirmPassword": regData.confirmPassword
        }
        const body = JSON.stringify(myData)

        const request = new Request(url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })

        try {
            fetch(request)
                .then((res) => {
                    if(res.status === 200)
                    {
                        res.json().then((val) => {
                            setSuccess('Account created')
                            setError('')
                            setRegData((vsl) => ({
                                name: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }))

                        })
                        setLoading(false)
                    }
                    else 
                    {
                        res.json().then((val) => {
                            setSuccess('')
                            setError(val.message)
                        })
                        setLoading(false)
                    }
                })
        }
        catch (error)
        {
            setError('Unable to register Conntection Error')
        }

    }

    if (loading) 
    {
        return (
            <Loading />
        )
    }

    return (
        <div>
            { <label className = 'text-danger'>{error}</label> } <br />
            { <label className = 'text-success'>{success}</label> } <br />
            Register
            <form className = 'd-flex flex-column gap-2'>
                <FormGroup>
                    <input 
                        className = 'form-control form-control-sm'
                        placeholder = 'Name'
                        name = 'name'
                        value = { regData.name }
                        onChange = { (event) => setRegData((val) => ({
                            ...val,
                            name: event.target.value
                        })) }
                    />
                </FormGroup>
                <FormGroup>
                    <input 
                        className = 'form-control form-control-sm'
                        placeholder = 'Email'
                        value = { regData.email }
                        name = 'email'
                        onChange = { (event) => setRegData((val) => ({
                            ...val,
                            email: event.target.value
                        })) }
                    />
                </FormGroup>
                <FormGroup>
                    <input 
                        className = 'form-control form-control-sm'
                        placeholder = 'Password'
                        value = { regData.password }
                        name = 'password'
                        onChange = { (event) => setRegData((val) => ({
                            ...val,
                            password: event.target.value
                        })) }
                    />
                </FormGroup>
                <FormGroup>
                    <input 
                        className = 'form-control form-control-sm'
                        placeholder = 'Confirm Password'
                        value = { regData.confirmPassword }
                        name = 'confirmPassword'
                        onChange = { (event) => setRegData((val) => ({
                            ...val,
                            confirmPassword: event.target.value
                        })) }
                    />
                </FormGroup>
                <FormGroup className = 'd-flex flex-column gap-2 w-50'>
                    <Button className = 'btn btn-sm' disabled = { loading } onClick = { registerHandler }>
                        Register
                    </Button>
                    <Button className = 'btn btn-sm' disabled = { loading } onClick = { () => Navi('/') }>
                        Back
                    </Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default Register