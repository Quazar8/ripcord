export enum WSDataType {
    FRIEND_REQUEST,
    CHAT_MESSAGE
}

export type WSMessage<P> = {
    type: WSDataType,
    payload: P
}