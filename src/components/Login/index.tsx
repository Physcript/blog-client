

import React,{ useState,useContext } from 'react'
import { Button } from 'react-bootstrap'
import UserContext from '../../context/auth/context'
import { useNavigate } from 'react-router-dom'
export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = props => {

    const Navi = useNavigate()
    const AuthContext = useContext(UserContext)

    const [ userInput,setUserInput ] = useState({
        email: '',
        password: ''
    })
    const [ error,setError ] = useState('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name,value } = e.target

        setUserInput( (val) => ({
            ...val,
            [name]:value
        }) )

    }

    const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        // setup fetch
        
        const url = 'https://blog-ts.herokuapp.com/api/login'
        const myData = {
            email: userInput.email,
            password: userInput.password
        }
        const data = JSON.stringify(myData)

        const request = new Request(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })

        fetch(request)
            .then((res) => {
                if(res.status === 200)
                {
                    res.json().then((json) => {
                        
                        AuthContext.userDispatch({ type: 'LOGIN', payload: json.message })
                        Navi('/')
                    })
                }
                else 
                {   
                    
                    res.json().then((json) => {
                        setError(json.message)
                    })
                }
            })

    }

    return (
        <div className = 'd-flex flex-column gap-2'>
            <label className = 'text-danger' >{ error }</label>
            <label>Login</label>
            <div className = 'd-flex flex-column gap-2'>
                <input 
                    type = 'text' 
                    name = 'email'
                    value = { userInput.email }
                    onChange = { onChange }
                />
                <input 
                    type = 'password'
                    name = 'password'
                    value = { userInput.password }
                    onChange = { onChange }
                />
            </div>
            <Button 
                className = 'btn btn-sm'
                onClick = { loginHandler }
            >Login
            </Button>
            <Link to = '/'>Back</Link>
        </div>
    )
}

export default Login