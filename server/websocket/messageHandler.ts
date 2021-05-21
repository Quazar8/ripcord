import { Document } from "mongoose";
import { Channel, IChannel } from "../db/models/channel.js";
import { User } from "../db/models/user.js";
import { ChannelDoc, ChatMessagePayload, ChatMessageStatus, ChatMessageStatusPayload, isChannelDoc, Message, MessageClient } from "../types/ChatTypes.js";
import { isUserDoc, UserDoc } from "../types/UserTypes.js";
import { WSDataType, WSMessage } from "../types/WebsocketTypes.js";
import { sendSocketMsg } from './onlineUsers.js'
import { genId } from '../utils.js'

const createNewChannel = async (byUser: UserDoc, receiver: UserDoc): Promise<Document> => {
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
    await channel.save()

    if (!byUser.channels) {
        byUser.channels = {}
    }

    if (!receiver.channels) {
        receiver.channels = {}
    }

    byUser.channels[receiver._id.toHexString()] = channel._id
    receiver.channels[byUser._id.toHexString()] = channel._id

    await byUser.save()
    await receiver.save()

    return channel
}

const createMessage = (payload: ChatMessagePayload, byUser: UserDoc): Message => {
    return {
        id: genId(8) + "_" + Date.now(),
        authorId: byUser._id,
        content: payload.content,
        date: new Date(),
        edited: false
    }
}

const addToActiveChannels = async (byUser: UserDoc, receiver: UserDoc, channel: ChannelDoc) => {
    if (byUser.activeChannels.indexOf(channel._id) < 0) {
        byUser.activeChannels.push(channel._id)
        await byUser.save()
    }

    if (receiver.activeChannels.indexOf(channel._id) < 0) {
        receiver.activeChannels.push(channel._id)
        await receiver.save()
    }
}

const handleChatMessage = async (payload: ChatMessagePayload, byUser: UserDoc) => {
    if (!payload.content || !byUser || !payload.toId) {
        return
    }

    try {
        const receiver = await User.findById(payload.toId)
        if (!isUserDoc(receiver)) {
            return
        }

        let channel: Document = null

        if (!receiver.channels) receiver.channels = {}
        let channelId = payload.channelId || receiver.channels[byUser._id.toHexString()]

        if (channelId) {
            channel = await Channel.findById(channelId)
        } else {
            channel = await createNewChannel(byUser, receiver)   
        }

        if (!isChannelDoc(channel)) {
            return
        }

        channel.messages.push(createMessage(payload, byUser))

        await channel.save()
        await addToActiveChannels(byUser, receiver, channel)
        
        const receiverMsg: WSMessage<ChatMessagePayload> = {
            type: WSDataType.CLIENT_RECEIVED_MSG,
            payload
        }

        const senderPayload: ChatMessageStatusPayload = {
            channelId: channel._id.toHexString(),
            temporaryId: '',
            realId: '',
            status: ChatMessageStatus.DELIVERED
        }

        const senderMsg: WSMessage<ChatMessageStatusPayload> = {
            type: WSDataType.CHAT_MESSAGE_STATUS,
            payload: senderPayload
        }

        sendSocketMsg(receiver._id, receiverMsg)
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