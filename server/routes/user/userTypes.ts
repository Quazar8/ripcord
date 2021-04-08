import { IUserModel } from '../../db/models'

export type UserInfo = Omit<IUserModel, 'password'>

export interface UserLoggedObj {
    username: string,
    registeredAt: Date,
    token: string
}

export interface LoginEntryObj {
    username: string,
    password: string
}