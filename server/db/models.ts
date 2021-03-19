import { model, Types, Schema } from 'mongoose'

interface IUser {
    id: string,
    username: string,
    password: string,
    registeredAt: Date
}

const UserSchema = new Schema ({
    id: Types.ObjectId,
    username: String,
    password: String,
    registeredAt: Date
})

const User = model('User', UserSchema)

export {
    IUser,
    User
}