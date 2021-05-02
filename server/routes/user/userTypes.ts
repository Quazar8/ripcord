import { Types } from 'mongoose'
import { IUserModel } from '../../db/models/models'

export type UserInfo = Omit<IUserModel, 'password'> & {
    id: Types.ObjectId
}

export type UserClientInfo = UserInfo

export type LoginEntryObj = Pick<IUserModel, 'password' | 'username'>