import { ActiveChannelInfo } from "../../../server/types/ChatTypes";
import { ChatAction, ChatActionTypes } from "./chatActions";

export type ChatState = {
    currentRecipientId: string,
    activeChannels: ActiveChannelInfo[]
}

export const chatStateInit: ChatState = {
    currentRecipientId: '',
    activeChannels: []
}

const changeRecipient = (state: ChatState, recipientId: string): ChatState => {
    return {
        ...state,
        currentRecipientId: recipientId
    }
}

export const chatReducer = (state: ChatState = chatStateInit, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionTypes.CHANGE_CHAT_RECIPIENT:
            return changeRecipient(state, action.payload)
        default: return state
    }
}