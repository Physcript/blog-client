

export default interface IUser {
    _id: string,
    name: string
}

export const DEFAULT_USER = {
    _id: '',
    name: '',
}

export const DEFAULT_TOKEN = ''

export interface IUserState {
    user: IUser,
    token: string,
}
export interface IUserAction {
    type: 'LOGIN' | 'LOGOUT' | 'AUTHENTICATE',
    payload: IUserState
}

export const initialUserState: IUserState = {
    user: DEFAULT_USER,
    token: DEFAULT_TOKEN
}

export interface IUserContextProps {
    userState: IUserState,
    userDispatch: React.Dispatch<IUserAction>
}