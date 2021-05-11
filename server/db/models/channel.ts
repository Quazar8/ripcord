import mongoose, { Types } from 'mongoose'
import { Message } from '../../types/ChatTypes'
const { Schema, model } = mongoose

export interface IChannel {
    participantOne: Types.ObjectId
    participantTwo: Types.ObjectId
    createdAt: Date
    messages: Message[]
}

const channelSchema = new Schema<IChannel>({
    participantOne: Schema.Types.ObjectId,
    participantTwo: Schema.Types.ObjectId,
    createdAt: { type: Date, default: new Date() },
    messages: { type: Array, default: [] }
})

export const Channel = model('Channel', channelSchema)