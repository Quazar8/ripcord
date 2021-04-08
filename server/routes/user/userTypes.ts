import { IUserModel } from '../../db/models'

export type UserInfo = Omit<IUserModel, 'password'>

export type UserLoggedObj = {
    username: string,
    registeredAt: Date,
    token: string
}

export type LoginEntryObj = Pick<IUserModel, 'password' | 'username'>