import { Dispatch } from 'react'
import { Action } from './StoreTypes'

export enum GlobalActionTypes {
    PushNotification,
    RemoveNotification,
    RecordUserInfo
}

export type Notification = {
    id: string
    msg: string
    type: 'info' | 'error' | 'success'
}

export interface IUser {
    username: string,
}

export type GlobalPayloads = Notification | string | IUser

export type GlobalAction = Action<GlobalActionTypes, GlobalPayloads>

export const addNotification =
        (notification: Notification) => {
    return {
        type: GlobalActionTypes.PushNotification,
        payload: notification
    }
}

export const recordUserAction = (user: IUser): GlobalAction => ({
    type: GlobalActionTypes.RecordUserInfo,
    payload: user
})

const removeNotificationAction = (id: Notification['id']) => {
    return {
        type: GlobalActionTypes.RemoveNotification,
        payload: id
    }
}

export const pushNotification = (dispatch: Dispatch<GlobalAction>) =>
    (type: Notification['type'], msg: Notification['msg']) => {
        const notification: Notification = {
            id: '' + Date.now(),
            type,
            msg
        }
        
        dispatch(addNotification(notification))
        setTimeout(() => {
            dispatch(removeNotificationAction(notification.id))
        }, 3000)
}