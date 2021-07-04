import mongoose, { Types } from 'mongoose'
import { genProfilePicColorJson } from '../../methods/userMethods.js'
import { UserStatus } from '../../types/UserTypes.js'
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
    profilePic: { type: String, default: function() {
        return JSON.stringify(genProfilePicColorJson(this.username))
    }},
    onlineStatus: { type: String, default: UserStatus.Online }
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