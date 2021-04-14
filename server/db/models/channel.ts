import mongoose from 'mongoose'
const { Schema, model } = mongoose

export type Message = {
    id: string,
    author: string,
    createdAt: Date
}

const channelSchema = new Schema({
    participantOne: String,
    participantTwo: String,
    messages: Array<Message>
})

export const Channel = model('Channel', channelSchema)