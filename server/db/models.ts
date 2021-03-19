import { model, Types, Schema } from 'mongoose'

const UserSchema = new Schema ({
    id: Types.ObjectId,
    username: String,
    password: String,
    registeredAt: Date
})

const User = model('User', UserSchema)

export {
    User
}