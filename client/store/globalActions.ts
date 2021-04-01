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

type AddNotificationAction = Action<GlobalActionTypes.PushNotification, Notification>

export const addNotification =
        (type: Notification['type'], msg: Notification['msg']): AddNotificationAction => {

    const notification: Notification = {
        id: '' + Date.now(),
        msg,
        type
    }

    return {
        type: GlobalActionTypes.PushNotification,
        payload: notification
    }
}