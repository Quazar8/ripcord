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

export type GlobalType = Notification

export const addNotification =
        (data: Notification): Action<Notification, GlobalActionTypes> => {
    return {
        type: GlobalActionTypes.PushNotification,
        payload: data
    }
}