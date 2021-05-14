import { Channel } from "../db/models/channel.js";
import { ChatMessagePayload, isChannelDoc } from "../types/ChatTypes.js";
import { UserDoc } from "../types/UserTypes.js";
import { WSDataType, WSMessage } from "../types/WebsocketTypes.js";
import { sendSocketMsg } from './onlineUsers.js'

const handleChatMessage = async (payload: ChatMessagePayload, byUser: UserDoc) => {
    if (!payload.channelId || !payload.content || !byUser) {
        return
    }

    try {
        const channel = await Channel.findById(payload.channelId)

        if (!isChannelDoc(channel)) {
            return
        }

        if (!byUser._id.equals(channel.participantTwo)
            && byUser._id.equals(channel.participantTwo)) {
            return
        }

        channel.messages.push({
            content: payload.content,
            authorId: byUser._id,
            edited: false,
            date: new Date()
        })

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