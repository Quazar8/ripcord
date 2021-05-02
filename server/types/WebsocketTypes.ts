export enum WSDataType {
    FRIEND_REQUEST
}

export type WSMessage = {
    type: WSDataType,
    payload: any
}