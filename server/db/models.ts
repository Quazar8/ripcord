import { model, Types, Schema } from 'mongoose'

const UserSchema = new Schema ({
    username: { type: String, unique: true },
    password: String,
    registeredAt: Date
})

const User = model('User', UserSchema)

export {
    User
}