import { UserStatus } from "./UserTypes"

export enum WSDataType {
    FRIEND_REQUEST,
    REMOVE_INC_FRIEND,
    CHAT_MESSAGE,
    CLIENT_RECEIVED_MSG,
    CHAT_MESSAGE_STATUS,
    NEW_ACTIVE_CHANNEL,
    FRIEND_STATUS_CHANGE,
    CALL_OFFER,
    CALL_ANSWER
}

export type WSMessage<P> = {
    type: WSDataType
    payload: P
}

export type StatusChangePayload = {
    userId: string
    status: UserStatus
}

export type CallOfferPayload = {
    recipientId: string
    sdp: RTCSessionDescription
    mediaConstraints: {
        audio: boolean
        video: boolean
    }
}

export type CallAnswerPayload = {
    sdp: RTCSessionDescription
}