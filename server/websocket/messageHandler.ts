import { Types } from "mongoose";
import { WSDataType, WSMessage } from "../types/WebsocketTypes.js";
import { handleChatMessage } from './messageHandlers/chatMessageHandler.js'
import { acceptedCallHandler, receivingCallDeniedHandler, startCallDetailsHandler, startCallHandler } from './messageHandlers/callServerHandler.js'

const messageHandler = async (wsMsg: WSMessage<any>, userId: Types.ObjectId) => {
    console.log('socket message', wsMsg)
    
    switch (wsMsg.type) {
        case WSDataType.CHAT_MESSAGE:
            handleChatMessage(wsMsg.payload, userId); break;
        case WSDataType.START_CALL:
            startCallHandler(wsMsg.payload, userId); break;
        case WSDataType.CALL_ACCEPTED:
            acceptedCallHandler(wsMsg.payload, userId); break;
        case WSDataType.RECEIVING_CALL_DENIED:
            receivingCallDeniedHandler(wsMsg.payload); break;
        case WSDataType.CALL_DETAILS:
            startCallDetailsHandler(wsMsg); break;
        default: break;
    }
}

export default messageHandler