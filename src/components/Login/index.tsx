

import React,{ useState } from 'react'
import { Button } from 'react-bootstrap'

export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = props => {

    const [ userInput,setUserInput ] = useState({
        email: '',
        password: ''
    })

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
        
        const url = 'http://localhost:1337/api/login'
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
                        console.log(json)
                    })
                }
                else 
                {   
                    
                    res.json().then((json) => {
                        console.log(json, 'no network')
                    })
                }
            })

    }

    return (
        <div className = 'd-flex flex-column gap-2'>
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
        </div>
    )
}

export default Login