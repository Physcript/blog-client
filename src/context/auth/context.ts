
import { createContext } from 'react'
import { initialUserState, IUserContextProps } from '../../interfaces/user'

const UserContext = createContext<IUserContextProps>({
    userState: initialUserState,
    userDispatch: () => {}
})

export const UserContextProvider = UserContext.Provider
export const UserContextConsumer = UserContext.Consumer
export default UserContext