export enum WSDataType {
    FRIEND_REQUEST
}

export type WSMessage<P> = {
    type: WSDataType,
    payload: P
}