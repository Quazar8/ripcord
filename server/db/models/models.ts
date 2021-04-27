import mongoose, { Document } from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema ({
    username: { type: String, unique: true },
    password: String,
    registeredAt: { type: Date, default: () => Date.now() },
    friendsIds: { type: [String], default: [] }
})

export interface IUserModel {
    username: string,
    password: string,
    registeredAt: Date,
    friendsIds: string[]
}

export type IUserDoc = Document & IUserModel

export const User = model('User', UserSchema)
