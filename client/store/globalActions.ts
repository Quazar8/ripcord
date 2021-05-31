import { Dispatch } from 'react'
import { UserClientInfo } from '../../server/types/UserTypes'
import { Action } from './storeComponents/StoreTypes'

export enum GlobalActionTypes {
    PushNotification = "PUSH_NOTIFICATION",
    RemoveNotification = "REMOVE_NOTIFICATION",
    RecordUserInfo = "RECORD_USER_INFO",
    RemoveUserInfo = "REMOVE_USER_INFO",
    ToggleUserMenu = "TOGGLE_USER_MENY",
    FriendNotification = "FRIEND_NOTIFICATION",
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
        type: GlobalActionTypes.PushNotification,
        payload: notification
    }
}

export const recordUserAction = (user: UserClientInfo): GlobalAction => ({
    type: GlobalActionTypes.RecordUserInfo,
    payload: user
})

export const removeUserInfoAction = (): GlobalAction => ({
    type: GlobalActionTypes.RemoveUserInfo,
    payload: null
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

export const toggleUserMenuAction = (show: boolean): GlobalAction => ({
    type: GlobalActionTypes.ToggleUserMenu,
    payload: show
})

export const friendNotificationAction = (): GlobalAction => ({
    type: GlobalActionTypes.FriendNotification,
    payload: null
})

export const clearFriendNotificationAction = (): GlobalAction => ({
    type: GlobalActionTypes.CLEAR_FRIEND_NOTIFICATiONS,
    payload: null
})