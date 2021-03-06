export {
    CallAcceptedPayload,
    StartCallPayload,
    CallAnswerDetailsPayload,
    CallDetailsPayload,
    CallDeniedPayload,
    DenyingCallPayload,
    HangUpCallPayload,
    NewICECandPayload,
    StatusChangePayload,
    ReceivingCallPayload
} from './wsPayloads/callPayloads'

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