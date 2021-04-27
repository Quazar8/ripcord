import mongoose, { Document, Types } from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema ({
    username: { type: String, unique: true },
    password: String,
    registeredAt: { type: Date, default: () => Date.now() },
    friendsIds: { type: [Schema.Types.ObjectId], default: [] }
})

export interface IUserModel {
    username: string,
    password: string,
    registeredAt: Date,
    friendsIds: Types.ObjectId[]
}

export type IUserDoc = Document & IUserModel

export const User = model('User', UserSchema)
