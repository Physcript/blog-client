import { IUserState,IUserAction, initialUserState } from "../../interfaces/user"

export const reducer = (state:IUserState,action:IUserAction) => {

    let user = action.payload.user
    let token = action.payload.token

    switch(action.type)
    {
        case 'LOGIN':
            {
                const currentTime = new Date().getTime()
                const exp = currentTime + ( 60 * 60 * 24 * 1000 * 7)

                document.cookie = `token=${token}; max-age=86400;SameSite=Lax; expires=${exp};`

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