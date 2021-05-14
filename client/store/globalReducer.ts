import { Action } from './storeComponents/StoreTypes'
import { GlobalActionTypes, Notification } from './globalActions'
import { UserClientInfo } from '../../server/types/UserTypes'
import { Types } from 'mongoose'

export type UserState = UserClientInfo

export type GlobalState = {
    notifications: Notification[]
    user: UserState
    showUserOptions: boolean
    showFriendsWindow: boolean
    friendNotifications: number,
    chat: {
        recipientId: string
    }
}

export const globalInit: GlobalState = {
    notifications: [],
    user: {
        username: '',
        registeredAt: new Date(),
        incFriendRequests: [],
        outFriendRequests: [],
        id: null,
        friendsIds: [],
        channels: {},
        activeChannels: []
    },
    showUserOptions: false,
    showFriendsWindow: false,
    friendNotifications: 0,
    chat: {
        recipientId: null
    }
}

const pushNotification = (currentState: GlobalState, notification: Notification): GlobalState => {
    const newState = { ...currentState }
    newState.notifications.push(notification)

    return newState
}

const removeNotification = (state: GlobalState, payload: Notification['id']) => {
    const newState = { ...state }
    for (let [i, not] of newState.notifications.entries()) {
        if (not.id === payload) {
            newState.notifications.splice(i, 1)
            break
        }
    }
    
    return newState
}

const recordUserInfo = (state: GlobalState, user: UserState): GlobalState => {
    return { ...state,
             user,
            friendNotifications: user.incFriendRequests.length
        }
}

const removeUserInfo = (state: GlobalState): GlobalState => {
    return { ...state, user: globalInit.user, showUserOptions: globalInit.showUserOptions }
}

const toggleUserMenu = (state: GlobalState, show: boolean): GlobalState => ({
    ...state,
    showUserOptions: show
})

const toggleFriendsWindow = (state: GlobalState, show: boolean): GlobalState => ({
    ...state,
    showFriendsWindow: show
})

const addFriendNotification = (state: GlobalState): GlobalState => {
    return {
        ...state,
        friendNotifications: state.friendNotifications + 1
    }
}

const showChatDisplay = (state: GlobalState, recipientId: string): GlobalState => {
    return {
        ...state,
        showFriendsWindow: false,
        chat: {
            recipientId
        }
    }
}

export const globalReducer = 
        (state: GlobalState = globalInit, action: Action<GlobalActionTypes, any>): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.PushNotification:
            return pushNotification(state, action.payload)
        case GlobalActionTypes.RemoveNotification:
            return removeNotification(state, action.payload)
        case GlobalActionTypes.RecordUserInfo:
            return recordUserInfo(state, action.payload)
        case GlobalActionTypes.RemoveUserInfo:
            return removeUserInfo(state)
        case GlobalActionTypes.ToggleUserMenu:
            return toggleUserMenu(state, action.payload)
        case GlobalActionTypes.ToggleFriendsWindow:
            return toggleFriendsWindow(state, action.payload)
        case GlobalActionTypes.FriendNotification:
            return addFriendNotification(state)
        case GlobalActionTypes.ShowChatDisplay:
            return showChatDisplay(state, action.payload)
        default: return state
    }
}

