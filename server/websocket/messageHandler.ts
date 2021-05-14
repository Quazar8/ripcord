import { Channel } from "../db/models/channel.js";
import { IUserDoc } from "../db/models/user.js";
import { ChatMessagePayload, isChannelDoc } from "../types/ChatTypes.js";
import { WSDataType, WSMessage } from "../types/WebsocketTypes.js";

const handleChatMessage = async (payload: ChatMessagePayload, byUser: IUserDoc) => {
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
    } 
    catch (err) {
        console.error(err)
    }
}

const messageHandler = (wsMsg: WSMessage<any>, user: IUserDoc) => {
    switch (wsMsg.type) {
        case WSDataType.CHAT_MESSAGE:
            handleChatMessage(wsMsg.payload, user);break;
        default: break;

    }
}

export default messageHandler