import { Document, Types } from "mongoose";
import { IChannel } from "../db/models/channel";
import { IUserModel } from "../db/models/user";
import { UserStatus } from "./UserTypes";

export type RecipientInfo = Pick<IUserModel, 'username'> & {
    id: Types.ObjectId
    status: UserStatus
}

export type Message = {
    authorId: Types.ObjectId
    date: Date
    edited: boolean
    content: string
}

export type ChannelDoc = Document & IChannel

export const isChannelDoc = (channel: Document): channel is ChannelDoc => {
    return channel?._id
}

export type ChannelClientInfo = {
    id: string
    participantOne: Types.ObjectId
    participantTwo: Types.ObjectId
    messages: Message[]
}

export type ChatMessagePayload = {
    channelId: string
    content: string
}