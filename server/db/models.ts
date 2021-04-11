import mongoose, { Document } from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema ({
    username: { type: String, unique: true },
    password: String,
    registeredAt: { type: Date, default: () => Date.now() }
})

export interface IUserModel {
    username: string,
    password: string,
    registeredAt: Date
}

export interface IUserDoc extends Document, IUserModel {}

export const User = model('User', UserSchema)
