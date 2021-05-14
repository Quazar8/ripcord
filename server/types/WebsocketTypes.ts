export enum WSDataType {
    FRIEND_REQUEST,
    CHAT_MESSAGE,
    CLIENT_RECEIVED_MSG
}

export type WSMessage<P> = {
    type: WSDataType,
    payload: P
}