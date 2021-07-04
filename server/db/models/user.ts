import mongoose, { Types } from 'mongoose'
import { genProfilePicColorJson } from '../../routes/user/register.js'
import { UserDoc, UserStatus } from '../../types/UserTypes.js'
const { Schema, model } = mongoose

const UserSchema = new Schema<IUserModel> ({
    username: { type: String, unique: true },
    password: String,
    registeredAt: { type: Date, default: () => Date.now() },
    friendsIds: { type: [Schema.Types.ObjectId], default: [] },
    incFriendRequests: { type: [Schema.Types.ObjectId], default: [] },
    outFriendRequests: { type: [Schema.Types.ObjectId], default: [] },
    channels: {},
    activeChannels: { type: [Schema.Types.ObjectId], default: [] },
    profilePic: String,
    onlineStatus: { type: String, default: UserStatus.Online}
})

export interface IUserModel {
    username: string,
    password: string,
    registeredAt: Date,
    friendsIds: Types.ObjectId[],
    incFriendRequests: Types.ObjectId[],
    outFriendRequests: Types.ObjectId[],
    channels: {
        [UserId: string]: [ChannelId: string]
    },
    activeChannels: Types.ObjectId[],
    profilePic: string,
    onlineStatus: Exclude<UserStatus, UserStatus.Offline>
}

export const User = model('User', UserSchema)

export const updateOldUsersNewFields = (user: UserDoc) => {
    if (!user.profilePic) {
        user.profilePic = JSON.stringify(genProfilePicColorJson(user.username))
    }

    user.save()

    return user
}