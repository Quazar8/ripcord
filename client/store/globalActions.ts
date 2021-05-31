import { Dispatch } from 'react'
import { UserClientInfo } from '../../server/types/UserTypes'
import { Action } from './storeComponents/StoreTypes'

export enum GlobalActionTypes {
    PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
    REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",
    RECORD_USER_INFO = "RECORD_USER_INFO",
    REMOVE_USER_INFO = "REMOVE_USER_INFO",
    TOGGLE_USER_MENU = "TOGGLE_USER_MENU",
    FRIEND_NOTIFICATION = "FRIEND_NOTIFICATION",
    CLEAR_FRIEND_NOTIFICATiONS = "CLEAR_FRIEND_NOTIFICATiOnS"
}

export type Notification = {
    id: string
    msg: string
    type: 'info' | 'error' | 'success'
}

export type GlobalPayloads = Notification | string | UserClientInfo 

export type GlobalAction = Action<GlobalActionTypes, any>

export const addNotification =
        (notification: Notification) => {
    return {
        type: GlobalActionTypes.PUSH_NOTIFICATION,
        payload: notification
    }
}

export const recordUserAction = (user: UserClientInfo): GlobalAction => ({
    type: GlobalActionTypes.RECORD_USER_INFO,
    payload: user
})

export const removeUserInfoAction = (): GlobalAction => ({
    type: GlobalActionTypes.REMOVE_USER_INFO,
    payload: null
})

const removeNotificationAction = (id: Notification['id']) => {
    return {
        type: GlobalActionTypes.REMOVE_NOTIFICATION,
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

export const toggleUserMenuAction = (show: boolean): GlobalAction => ({
    type: GlobalActionTypes.TOGGLE_USER_MENU,
    payload: show
})

export const friendNotificationAction = (): GlobalAction => ({
    type: GlobalActionTypes.FRIEND_NOTIFICATION,
    payload: null
})

export const clearFriendNotificationAction = (): GlobalAction => ({
    type: GlobalActionTypes.CLEAR_FRIEND_NOTIFICATiONS,
    payload: null
})