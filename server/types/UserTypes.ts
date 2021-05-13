import { Types } from 'mongoose'
import { IUserModel } from '../db/models/user'
import { IUserDoc } from '../db/models/user.js'
import { Document } from 'mongoose'

export const isUserDoc = (doc: Document): doc is IUserDoc => {
    return doc?._id
}

export type UserInfo = Omit<IUserModel, 'password'> & {
    id: Types.ObjectId
}

export type UserClientInfo = UserInfo

export type LoginEntry = Pick<IUserModel, 'password' | 'username'>

export enum UserStatus {
    Online = 'Online',
    Offline = 'Offline'
}

export type FriendClientInfo = {
    id: string
    username: string,
    status: UserStatus
}

export type PendingFriendInfo = {
    id: Types.ObjectId
    username: string
}