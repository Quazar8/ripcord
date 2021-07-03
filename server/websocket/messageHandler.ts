import { Document, Types } from "mongoose";
import { Channel, IChannel } from "../db/models/channel.js";
import { User } from "../db/models/user.js";
import { ChannelDoc, ChatMessagePayload, ChatMessageStatus, ChatMessageStatusPayload, ChatReceiverPayload, isChannelDoc, Message, MessageClient, NewActiveChannelPayload } from "../types/ChatTypes.js";
import { isUserDoc, UserDoc } from "../types/UserTypes.js";
import { WSDataType, WSMessage } from "../types/WebsocketTypes.js";
import { isOnline, sendSocketMsg } from './onlineUsers.js'
import { genId } from '../methods/utils.js'

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

    byUser.channels[receiver._id.toHexString()] = channel._id.toHexString()
    receiver.channels[byUser._id.toHexString()] = channel._id.toHexString()

    receiver.markModified('channels')
    byUser.markModified('channels')
    
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

const addToActiveChannels = async (byUser: UserDoc,
    receiver: UserDoc, channel: ChannelDoc): Promise<{
        addedToByUser: boolean,
        addedToReceiver: boolean
    }> => {
    let addedToByUser = false
    let addedToReceiver = false

    if (!byUser.activeChannels) {
        byUser.activeChannels = []
    }

    if (!receiver.activeChannels) {
        receiver.activeChannels = []
    }

    console.log('byUser active channles', byUser.activeChannels)
    console.log('receiver active channel', receiver.activeChannels)

    if (byUser.activeChannels.indexOf(channel._id) < 0) {
        byUser.activeChannels.push(channel._id)
        await byUser.save()
        addedToByUser = true
    }

    if (receiver.activeChannels.indexOf(channel._id) < 0) {
        receiver.activeChannels.push(channel._id)
        await receiver.save()
        addedToReceiver = true
    }

    return {
        addedToByUser,
        addedToReceiver
    }
}

const sendErrorStatusMessage = (byUser: UserDoc, msgPayload: ChatMessagePayload, errorMsg: string) => {
    if (!isOnline(byUser._id)) return

    const payload: ChatMessageStatusPayload = {
        channelId: msgPayload.channelId,
        temporaryId: msgPayload.temporaryId,
        realId: null,
        status: ChatMessageStatus.FAILED,
        recipientId: msgPayload.recipientId,
        errorMsg
    }

    const msg: WSMessage<ChatMessageStatusPayload> = {
        type: WSDataType.CHAT_MESSAGE_STATUS,
        payload
    }

    sendSocketMsg(byUser._id, msg)
}

const handleChatMessage = async (payload: ChatMessagePayload, byUserId: Types.ObjectId) => {
    if (!payload.content || !byUserId || !payload.recipientId) {
        return
    }

    try {
        const byUser = await User.findById(byUserId)
        if (!isUserDoc(byUser)) {
            return
        }

        const receiver = await User.findById(payload.recipientId)
        if (!isUserDoc(receiver)) {
            return
        }

        if (receiver.friendsIds.indexOf(byUser._id) < 0) {
            sendErrorStatusMessage(byUser, payload,
                'You can\'t chat if you are not friends')
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

        const message = createMessage(payload, byUser)
        channel.messages.push(message)

        await channel.save()
        const addedActiveChannel = await addToActiveChannels(byUser, receiver, channel)

        const createActiveChannelInfo = (recipient: UserDoc, channel: ChannelDoc,
                newMessages: number): NewActiveChannelPayload => {
            const payload: NewActiveChannelPayload = {
                id: channel._id.toHexString(),
                recipientId: recipient._id.toHexString(),
                recipientUsername: recipient.username,
                recipientPic: recipient.profilePic,
                newMessages
            }

            return payload
        }
        
        if (isOnline(receiver._id)) {
            const receiverPayload: ChatReceiverPayload = {
                msg: {
                    id: message.id,
                    content: message.content,
                    edited: message.edited,
                    date: message.date,
                    authorId: byUser._id.toHexString()
                },
                channelId: channel._id.toHexString(),
            }

            if (addedActiveChannel.addedToReceiver) {
               receiverPayload.newActiveChannel = createActiveChannelInfo(byUser, channel, 1)
            }

            const receiverMsg: WSMessage<ChatReceiverPayload> = {
                type: WSDataType.CLIENT_RECEIVED_MSG,
                payload: receiverPayload
            }

            sendSocketMsg(receiver._id, receiverMsg)
        }

        if (isOnline(byUser._id)) {
            const senderPayload: ChatMessageStatusPayload = {
                channelId: channel._id.toHexString(),
                temporaryId: payload.temporaryId,
                realId: message.id,
                status: ChatMessageStatus.DELIVERED,
                recipientId: payload.recipientId
            }

            if (addedActiveChannel.addedToByUser) {
                senderPayload.newActiveChannel = createActiveChannelInfo(receiver, channel, 0)
            }

            const senderResponse: WSMessage<ChatMessageStatusPayload> = {
                type: WSDataType.CHAT_MESSAGE_STATUS,
                payload: senderPayload
            }

            sendSocketMsg(byUser._id, senderResponse)
        }
    } 
    catch (err) {
        console.error(err)
    }
}

const messageHandler = async (wsMsg: WSMessage<any>, userId: Types.ObjectId) => {
    switch (wsMsg.type) {
        case WSDataType.CHAT_MESSAGE:
            handleChatMessage(wsMsg.payload, userId);break;
        default: break;
    }
}

export default messageHandler