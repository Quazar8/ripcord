import { ActiveChannelInfo, ChatMessageStatus, ChatMessageStatusPayload, RecipientInfo } from "../../../server/types/ChatTypes";
import { UserStatus } from "../../../server/types/UserTypes";
import { ClientChannelInfoWPending, PendingMsg } from "../../types/ChatClientTypes";
import { ChatAction, ChatActionTypes } from "./chatActions";

export type ChatChannelState = {
    channel: ClientChannelInfoWPending
    recipient: RecipientInfo
}

export type ChatState = {
    currentRecipientId: string,
    activeChannels: ActiveChannelInfo[],
    currentChannelId: string,
    chatChannel: ChatChannelState
}

export const chatStateInit: ChatState = {
    currentRecipientId: '',
    activeChannels: [],
    currentChannelId: '',
    chatChannel: {
        recipient: {
            id: null,
            username: '',
            status: UserStatus.Offline
        },
        channel: {
            id: null,
            messages: [],
            participantOne: null,
            participantTwo: null
        }
    }
}

const changeRecipient = (state: ChatState, recipientId: string): ChatState => {
    return {
        ...state,
        currentRecipientId: recipientId,
        currentChannelId: chatStateInit.currentChannelId
    }
}

const updateActiveChannels = (state: ChatState, channels: ActiveChannelInfo[]): ChatState => {
    return {
        ...state,
        activeChannels: channels
    }
}

const changeChannelId = (state: ChatState, channelId: string): ChatState => {
    return {
        ...state,
        currentChannelId: channelId,
        currentRecipientId: chatStateInit.currentRecipientId
    }
}

const updateChannelInfo = (state: ChatState, channelInfo: ChatChannelState): ChatState => {
    return {
        ...state,
        chatChannel: channelInfo
    }
}

const addPendingChatMessage = (state: ChatState, msg: PendingMsg): ChatState => {
    const newState = { ...state }
    if (msg.channelId !== newState.chatChannel.channel.id) {
        return newState
    }

    newState.chatChannel.channel.messages.push(msg)
    return newState
}

const sentMessageResponse = (state: ChatState, res: ChatMessageStatusPayload): ChatState => {
    if (res.channelId !== state.chatChannel.channel.id) {
        return state
    }

    const newState = { ...state }
    const messages = newState.chatChannel.channel.messages
    for (let msg of messages) {
        if (!msg.temporaryId) {
            continue
        }

        if (msg.temporaryId === res.temporaryId) {
            msg.id = res.realId
            msg.status = res.status
            delete msg.temporaryId
            delete msg.channelId
            break
        }
    }

    return newState
}

const changeMsgToFail = (state: ChatState, temporaryId: string): ChatState => {
    if (!temporaryId) {
        return state
    }

    const newState = { ...state }
    for (let msg of newState.chatChannel.channel.messages) {
        if (!msg.temporaryId) continue

        if (msg.temporaryId === temporaryId
            && msg.status === ChatMessageStatus.PENDING) {
            msg.status = ChatMessageStatus.FAILED
            break
        }
    }

    return newState
}

export const chatReducer = (state: ChatState = chatStateInit, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionTypes.CHANGE_CHAT_RECIPIENT:
            return changeRecipient(state, action.payload)
        case ChatActionTypes.UPDATE_ACTIVE_CHANNELS:
            return updateActiveChannels(state, action.payload)
        case ChatActionTypes.CHANGE_CHANNEL_ID:
            return changeChannelId(state, action.payload)
        case ChatActionTypes.UPDATE_CHAT_CHANNEL:
            return updateChannelInfo(state, action.payload)
        case ChatActionTypes.SEND_CHAT_MSG:
            return addPendingChatMessage(state, action.payload)
        case ChatActionTypes.SENT_MSG_RESPONSE:
            return sentMessageResponse(state, action.payload)
        case ChatActionTypes.CHANGE_MSG_STATUS_FAIL:
            return changeMsgToFail(state, action.payload)
        default: return state
    }
}