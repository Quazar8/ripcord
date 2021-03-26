import { Action } from './StoreTypes'

export enum GlobalActionTypes {
    PushNotification,
    RemoveNotification
}

export type Notification = {
    msg: string
    type: 'info' | 'error' | 'success'
}

export const addNotification =
        (data: Notification): Action<Notification, GlobalActionTypes> => {
    return {
        type: GlobalActionTypes.PushNotification,
        payload: data
    }
}