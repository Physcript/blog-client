import { IUserState,IUserAction, initialUserState } from "../../interfaces/user"

export const reducer = (state:IUserState,action:IUserAction) => {
    let user = action.payload.user
    let token = action.payload.token

    switch(action.type)
    {
        case 'LOGIN':
            {
                localStorage.setItem('token',token)
                return {
                    user,
                    token
                }
            }
        case 'LOGOUT': 
            {
                localStorage.removeItem('token')
                return initialUserState
            }
        case 'AUTHENTICATE':
            {
                return state
            }
        default:      
            {
                return state
            }
    }

}   