import { UserStatus } from "./UserTypes"

export enum WSDataType {
    FRIEND_REQUEST,
    REMOVE_INC_FRIEND,
    CHAT_MESSAGE,
    CLIENT_RECEIVED_MSG,
    CHAT_MESSAGE_STATUS,
    NEW_ACTIVE_CHANNEL,
    FRIEND_STATUS_CHANGE,
    CALL_ANSWER_DETAILS,
    NEW_ICE_CAND,
    HANG_UP,
    START_CALL,
    RECEIVING_CALL,
    RECEIVING_CALL_DENIED,
    CALL_ACCEPTED,
    CALL_DETAILS,
    CALL_DENIED,
}

export type WSMessage<P> = {
    type: WSDataType
    payload: P
}

export type StatusChangePayload = {
    userId: string
    status: UserStatus
}

export type CallDetailsPayload = {
    recipientId: string
    sdp: RTCSessionDescription
    mediaConstraints: {
        audio: boolean
        video: boolean
    }
}

export type CallAnswerDetailsPayload = {
    sdp: RTCSessionDescription,
    callerId: string
}

export type NewICECandPayload = {
    recipientId: string,
    candidate: RTCIceCandidate
}

export type HangUpCallPayload = {
    otherUserId: string
}

export type StartCallPayload = {
    recipientId: string
}

export type ReceivingCallPayload = {
    callerId: string
    callerName: string
    callerProfilePic: string
}

export type DenyingCallPayload = {
    callerId: string
    recipientId: string
}

export type CallAcceptedPayload = {
    acceptedId: string
}

export type CallDeniedPayload = DenyingCallPayload