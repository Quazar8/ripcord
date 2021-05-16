import { Action } from "../storeComponents/StoreTypes";

export enum ChatActionTypes {
    CHANGE_CHAT_RECIPIENT
}

export type ChatAction = Action<ChatActionTypes, any>