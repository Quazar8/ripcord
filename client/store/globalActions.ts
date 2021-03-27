import { Action } from './StoreTypes'

export enum GlobalActionTypes {
    PushNotification,
    RemoveNotification
}

export type Notification = {
    id: string
    msg: string
    type: 'info' | 'error' | 'success'
}

export type GlobalPayloads = Notification

export type GlobalAction = Action<GlobalActionTypes, GlobalPayloads>

export const addNotification =
        (data: Notification): GlobalAction => {
    return {
        type: GlobalActionTypes.PushNotification,
        payload: data
    }
}