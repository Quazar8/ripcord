import mongoose, { Document } from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema ({
    username: { type: String, unique: true },
    password: String,
    registeredAt: { type: Date, default: () => Date.now() }
})

interface IUserModel {
    username: string,
    password: string,
    registeredAt: Date
}

interface IUserDoc extends Document, IUserModel {}

const User = model('User', UserSchema)

export {
    IUserModel,
    IUserDoc,
    User
}