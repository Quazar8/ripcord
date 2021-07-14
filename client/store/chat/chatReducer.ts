import { ChatMessageStatus, ChatMessageStatusPayload, ChatReceiverPayload, RecipientInfo } from "../../../server/types/ChatTypes";
import { UserStatus } from "../../../server/types/UserTypes";
import { ReceivingCallPayload } from "../../../server/types/WebsocketTypes";
import { ClientActiveChannel, ClientChannelInfoWPending, PendingMsg } from "../../types/ChatClientTypes";
import { ChatAction, ChatActionTypes } from "./chatActions";

export type ChatChannelState = {
    channel: ClientChannelInfoWPending
    recipient: RecipientInfo
}

export type ChatState = {
    currentRecipientId: string
    activeChannels: ClientActiveChannel[]
    currentChannelId: string
    chatChannel: ChatChannelState
    callInfo: {
        otherUserId: string
    } | null
    receivingCallInfo: {
        callerId: string
        callerName: string
        callerProfilePic: string
    } | null
}

export const chatStateInit: ChatState = {
    currentRecipientId: '',
    activeChannels: [],
    currentChannelId: '',
    chatChannel: {
        recipient: {
            id: null,
            username: null,
            status: UserStatus.Offline,
            profilePic: null
        },
        channel: {
            id: null,
            messages: [],
            participantOne: null,
            participantTwo: null
        }
    },
    callInfo: null,
    receivingCallInfo: null
}

const changeRecipient = (state: ChatState, recipientId: string): ChatState => {
    return {
        ...state,
        currentRecipientId: recipientId,
        currentChannelId: chatStateInit.currentChannelId
    }
}

const updateActiveChannels = (state: ChatState, channels: ClientActiveChannel[]): ChatState => {
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
    const newState = { ...state }
    if (!newState.chatChannel.channel.id) {
        if (newState.chatChannel.recipient.id !== res.recipientId) {
            return state
        }

        if (res.channelId) {
            newState.chatChannel.channel.id = res.channelId
        }
    } else {
        if (res.channelId !== newState.chatChannel.channel.id) {
            return state
        }
    }

    const insertErrorMessage = (arr: PendingMsg[], index: number, errText: string) => {
        let result = arr.slice(0, index + 1)
        const errMsg: PendingMsg = {
            id: null,
            authorId: null,
            content: errText,
            date: new Date(),
            edited: false
        }

        result.push(errMsg)
        if (index + 1 < arr.length)
            result.concat(arr.slice(index + 1))
        
        return result
    }

    const messages = newState.chatChannel.channel.messages
    const len = messages.length
    for (let i = 0; i < len; i++) {
        const msg = messages[i]
        if (!msg.temporaryId) {
            continue
        }

        if (msg.temporaryId === res.temporaryId) {
            msg.id = res.realId
            msg.status = res.status
            delete msg.temporaryId
            delete msg.channelId
            if (res.status === ChatMessageStatus.FAILED) {
                newState.chatChannel.channel.messages = insertErrorMessage(messages, i, res.errorMsg)
            }

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

const addActiveChannel = (state: ChatState, channelInfo: ClientActiveChannel): ChatState => {
    const newState = { ...state }
    newState.activeChannels.unshift(channelInfo)

    return newState
}

const moveChannelToTop = (state: ChatState, channelId: string): ChatState => {
    if (state.activeChannels[0].id === channelId) {
        return state
    }

    const newState = { ...state }
    const activeChannels = newState.activeChannels
    const resultArr = []

    for (let i = 0; i < activeChannels.length; i++) {
        if (activeChannels[i].id !== channelId) {
           resultArr.push(activeChannels[i])
        } else {
            resultArr.unshift(activeChannels[i])
        }
    }

    newState.activeChannels = resultArr
    return newState

}

const incrementActiveChannelNewMsg = (state: ChatState, channelId: string) => {
    if (state.chatChannel.channel.id === channelId) 
        return state

    for (let i = 0; i < state.activeChannels.length; i++) {
        if (state.activeChannels[i].id !== channelId) continue;

        const newState = { ...state }
        newState.activeChannels[i].newMessages++
        return newState
    }

    return state
}

const clearActiveChannelNotif = (state: ChatState, channelId: string) => {
    const newState = { ...state }

    for (const ch of newState.activeChannels) {
        if (ch.id === channelId) {
            ch.newMessages = 0
            break;
        }
    }

    return newState
}

const handleReceivingCall = (state: ChatState, callInfo: ReceivingCallPayload) => {
    const newState = { ...state }
    newState.receivingCallInfo = callInfo

    return newState
}

const removeIncCallInfo = (state: ChatState) => {
    return {
        ...state,
        receivingCallInfo: chatStateInit.receivingCallInfo
    }
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
        case ChatActionTypes.INC_ACTIVE_CHANNEL_NEW_MSG:
            return incrementActiveChannelNewMsg(state, action.payload)
        case ChatActionTypes.CLEAR_ACTIVE_CHANNEL_NOTIF:
            return clearActiveChannelNotif(state, action.payload)
        case ChatActionTypes.RECEIVING_CALL:
            return handleReceivingCall(state, action.payload)
        case ChatActionTypes.REMOVE_INC_CALL:
            return removeIncCallInfo(state)
        default: return state
    }
}