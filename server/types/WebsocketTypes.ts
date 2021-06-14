export enum WSDataType {
    FRIEND_REQUEST,
    REMOVE_INC_FRIEND,
    CHAT_MESSAGE,
    CLIENT_RECEIVED_MSG,
    CHAT_MESSAGE_STATUS,
    NEW_ACTIVE_CHANNEL
}

export type WSMessage<P> = {
    type: WSDataType,
    payload: P
}