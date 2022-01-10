import { IUserState,IUserAction, initialUserState } from "../../interfaces/user"

export const reducer = (state:IUserState,action:IUserAction) => {

    let user = action.payload.user
    let token = action.payload.token

    switch(action.type)
    {
        case 'LOGIN':
            {
            
                document.cookie = `token=${token}; max-age=86400;`

                return {
                    user,
                    token,
                    auth: true
                }
            }
        case 'LOGOUT': 
            {
                document.cookie = 'token=;'
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