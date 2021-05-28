import { ActiveChannelInfo, ChatMessageStatus, ChatMessageStatusPayload, ChatReceiverPayload, RecipientInfo } from "../../../server/types/ChatTypes";
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
    newMessages: number
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
    },
    newMessages: 0
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

const pushReceivedMsg = (state: ChatState, payload: ChatReceiverPayload): ChatState => {
    if (payload.channelId !== state.chatChannel.channel.id) {
        return state
    }

    const newState = { ...state }
    newState.chatChannel.channel.messages.push(payload.msg)

    return newState
}

const removeActiveChannelFromState = (state: ChatState, channelId: string): ChatState => {
    const newState = { ...state }
    let activeChannels = newState.activeChannels
    for (let i = 0; i < activeChannels.length; i++) {
        if (activeChannels[i].id === channelId) {
            activeChannels.splice(i, 1)
            break
        }
    }

    return newState
}

const addActiveChannel = (state: ChatState, channelInfo: ActiveChannelInfo): ChatState => {
    const newState = { ...state }
    newState.activeChannels.unshift(channelInfo)

    return newState
}

const moveChannelToTop = (state: ChatState, channelId: string): ChatState => {
    const newState = { ...state }
    const activeChannels = newState.activeChannels
    const resultArr = new Array(activeChannels.length)

    for (let i = 0; i < activeChannels.length; i++) {
        if (activeChannels[i].id !== channelId) {
            resultArr[i + 1] = activeChannels[i]
        } else {
            resultArr[0] = activeChannels[i]
        }
    }

    newState.activeChannels = resultArr
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
        case ChatActionTypes.PUSH_MSG_TO_CHANNEL:
            return pushReceivedMsg(state, action.payload)
        case ChatActionTypes.REMOVE_ACTIVE_CHANNEL:
            return removeActiveChannelFromState(state, action.payload)
        case ChatActionTypes.ADD_ACTIVE_CHANNEL:
            return addActiveChannel(state, action.payload)
        case ChatActionTypes.MOVE_ACTIVE_CHANNEL_TOP:
            return moveChannelToTop(state, action.payload)
        default: return state
    }
}