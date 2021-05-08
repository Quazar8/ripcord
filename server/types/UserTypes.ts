import { Types } from 'mongoose'
import { IUserModel } from '../db/models/models'
import { IUserDoc } from '../db/models/models.js'
import { Document } from 'mongoose'

export const isUserDoc = (doc: Document): doc is IUserDoc => {
    return doc?._id
}

export type UserInfo = Omit<IUserModel, 'password'> & {
    id: Types.ObjectId
}

export type UserClientInfo = UserInfo

export type LoginEntry = Pick<IUserModel, 'password' | 'username'>

export type FriendClientInfo = {
    id: Types.ObjectId
    username: string,
    status: 'Online' | 'Offline'
}

export type PendingFriendInfo = {
    id: Types.ObjectId
    username: string
}