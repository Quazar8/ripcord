import { Types } from "mongoose";
import { WSDataType, WSMessage } from "../types/WebsocketTypes.js";
import { handleChatMessage } from './messageHandlers/chatMessageHandler.js'

const messageHandler = async (wsMsg: WSMessage<any>, userId: Types.ObjectId) => {
    switch (wsMsg.type) {
        case WSDataType.CHAT_MESSAGE:
            handleChatMessage(wsMsg.payload, userId); break;
        default: break;
    }
}

export default messageHandler