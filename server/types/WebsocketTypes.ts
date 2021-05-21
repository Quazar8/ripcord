export enum WSDataType {
    FRIEND_REQUEST,
    CHAT_MESSAGE,
    CLIENT_RECEIVED_MSG,
    CHAT_MESSAGE_STATUS
}

export type WSMessage<P> = {
    type: WSDataType,
    payload: P
}