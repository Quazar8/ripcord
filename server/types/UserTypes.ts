import { Types } from 'mongoose'
import { IUserModel } from '../db/models/user'
import { Document } from 'mongoose'

export type UserDoc = Omit<Document, '_id'> & IUserModel & {
    _id: Types.ObjectId
}

export const isUserDoc = (doc: Document): doc is UserDoc => {
    return doc?._id
}

export type UserInfo = Omit<IUserModel, 'password'> & {
    id: string
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