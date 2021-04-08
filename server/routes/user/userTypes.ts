import { IUserModel } from '../../db/models'

export type UserInfo = Omit<IUserModel, 'password'>

export type UserLoggedObj = Pick<IUserModel, 'username' | 'registeredAt'> & {
    token: string
}

export type LoginEntryObj = Pick<IUserModel, 'password' | 'username'>