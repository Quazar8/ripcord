import { ActiveChannelInfo } from "../../../server/types/ChatTypes";
import { ChatAction } from "./chatActions";

export type ChatState = {
    currentRecipientId: string,
    activeChannels: ActiveChannelInfo[]
}

export const chatStateInit: ChatState = {
    currentRecipientId: null,
    activeChannels: []
}

export const chatReducer = (state: ChatState = chatStateInit, action: ChatAction): ChatState => {
    switch (action.type) {
        default: return state
    }
}