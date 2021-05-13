import { IUserDoc } from "../db/models/user.js";
import { ChatMessagePayload } from "../types/ChatTypes.js";
import { WSDataType, WSMessage } from "../types/WebsocketTypes.js";

const handleChatMessage = (payload: ChatMessagePayload, byUser: IUserDoc) => {
    console.log(payload)
}

const messageHandler = (wsMsg: WSMessage<any>, user: IUserDoc) => {
    switch (wsMsg.type) {
        case WSDataType.CHAT_MESSAGE:
            handleChatMessage(wsMsg.payload, user);break;
        default: break;

    }
}

export default messageHandler