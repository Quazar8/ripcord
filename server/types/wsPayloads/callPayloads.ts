import { WSDataType, WSMessage } from '../WebsocketTypes'


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