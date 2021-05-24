import { Document, Types } from "mongoose";
import { IChannel } from "../db/models/channel";
import { IUserModel } from "../db/models/user";
import { UserStatus } from "./UserTypes";

export type RecipientInfo = Pick<IUserModel, 'username'> & {
    id: string
    status: UserStatus,
    username: string
}

export type Message = {
    id: string
    authorId: Types.ObjectId
    date: Date
    edited: boolean
    content: string
}

export type MessageClient = Pick<Message, 'content'
| 'date' | 'edited' | 'id' > & {
    authorId: string
}

export type ChannelDoc = Document & IChannel

export const isChannelDoc = (channel: Document): channel is ChannelDoc => {
    return channel?._id
}

export type ChannelClientInfo = {
    id: string
    participantOne: string
    participantTwo: string
    messages: MessageClient[]
}

export type ActiveChannelInfo = {
    id: string
    recipientUsername: string
    recipientId: string
}

export type ChatMessagePayload = {
    channelId: string
    content: string
    authorId: string
    toId: string
    temporaryId: string
}

export enum ChatMessageStatus {
    DELIVERED = "DELIVERED",
    FAILED = "FAILED",
    PENDING = "PENDING"
}

export type ChatMessageStatusPayload = {
    channelId: string,
    temporaryId: string,
    realId: string,
    status: ChatMessageStatus
}

export type ChatReceiverPayload = MessageClient & {
    channelId: string
}