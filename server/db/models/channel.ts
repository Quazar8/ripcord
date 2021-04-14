import mongoose from 'mongoose'
const { Schema, model } = mongoose

export type Message = {
    id: string,
    author: string,
    createdAt: Date
}

export interface IChannel {
    participantOne: string,
    participantTwo: string,
    messages: Message[]
}

const channelSchema = new Schema({
    participantOne: String,
    participantTwo: String,
    messages: Array<Message>
})

export const Channel = model('Channel', channelSchema)