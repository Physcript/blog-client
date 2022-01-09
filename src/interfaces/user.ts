

export default interface IUser {
    _id: string,
    name: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export const DEFAULT_USER = {
    _id: '',
    name: '',
    email: ''
}

export const DEFAULT_TOKEN = ''

export interface IUserState {
    user: IUser,
    token: string,
    auth: boolean
}
export interface IUserAction {
    type: 'LOGIN' | 'LOGOUT' | 'AUTHENTICATE',
    payload: IUserState
}

export const initialUserState: IUserState = {
    user: DEFAULT_USER,
    token: DEFAULT_TOKEN,
    auth: false
}

export interface IUserContextProps {
    userState: IUserState,
    userDispatch: React.Dispatch<IUserAction>
}