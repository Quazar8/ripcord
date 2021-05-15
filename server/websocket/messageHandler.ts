import { Document } from "mongoose";
import { Channel, IChannel } from "../db/models/channel.js";
import { ChannelDoc, ChatMessagePayload, isChannelDoc, Message, MessageClient } from "../types/ChatTypes.js";
import { UserDoc } from "../types/UserTypes.js";
import { WSDataType, WSMessage } from "../types/WebsocketTypes.js";
import { sendSocketMsg } from './onlineUsers.js'

const createNewChannel = async (byUser: UserDoc, receiver: UserDoc, message: Message): Promise<Document> => {
    if (byUser.equals(receiver)) {
        return null
    }

    const newChannelData: IChannel = {
        createdAt: new Date(),
        messages: [],
        participantOne: byUser._id,
        participantTwo: receiver._id
    }

    const channel = new Channel(newChannelData)
    return await channel.save()
}

const createMessage = (payload: ChatMessagePayload, byUser: UserDoc): Message => {
    return {
        authorId: byUser._id,
        content: payload.content,
        date: new Date(),
        edited: false
    }
}

const handleChatMessage = async (payload: ChatMessagePayload, byUser: UserDoc) => {
    if (!payload.content || !byUser || !payload.toId) {
        return
    }

    try {
        let channel: Document = null

        if (payload.channelId) {
            channel = await Channel.findById(payload.channelId)
        } else {
            return
        }


        if (!isChannelDoc(channel)) {
            return
        }

        channel.messages.push(createMessage(payload, byUser))

        await channel.save()

        let receiverId = channel.participantOne
        if (channel.participantOne.equals(byUser._id)) {
            receiverId = channel.participantTwo
        }

        const receiverMsg: WSMessage<ChatMessagePayload> = {
            type: WSDataType.CLIENT_RECEIVED_MSG,
            payload
        }

        sendSocketMsg(receiverId, receiverMsg)
    } 
    catch (err) {
        console.error(err)
    }
}

const messageHandler = (wsMsg: WSMessage<any>, user: UserDoc) => {
    switch (wsMsg.type) {
        case WSDataType.CHAT_MESSAGE:
            handleChatMessage(wsMsg.payload, user);break;
        default: break;

    }
}

export default messageHandler