import { Document, Types } from "mongoose";
import { IChannel } from "../db/models/channel";
import { IUserModel } from "../db/models/models";

export type RecipientInfo = Pick<IUserModel, 'username'> & {
    id: Types.ObjectId
}

export type Message = {
    authorId: Types.ObjectId,
    authorName: string,
    date: Date,
    edited: boolean
}

export type ChannelDoc = Document & IChannel

export const isChannelDoc = (channel: ChannelDoc): channel is ChannelDoc => {
    return channel?._id
}

export type ChannelClientInfo = {
    id: Types.ObjectId,
    participantOne: Types.ObjectId,
    participantTwo: Types.ObjectId,
    messages: Message[]
}