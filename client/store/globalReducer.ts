import { Action } from './storeComponents/StoreTypes'
import { GlobalActionTypes, Notification } from './globalActions'
import { UserClientInfo } from '../../server/types/UserTypes'

export type UserState = UserClientInfo

export type GlobalState = {
    notifications: Notification[]
    user: UserState
    showUserOptions: boolean
    friendNotifications: number
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
    friendNotifications: 0
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

const addFriendNotification = (state: GlobalState): GlobalState => {
    return {
        ...state,
        friendNotifications: state.friendNotifications + 1
    }
}

const clearFriendNotifications = (state: GlobalState): GlobalState => {
    return {
        ...state,
        friendNotifications: 0
    }
}

export const globalReducer = 
        (state: GlobalState = globalInit, action: Action<GlobalActionTypes, any>): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.PUSH_NOTIFICATION:
            return pushNotification(state, action.payload)
        case GlobalActionTypes.REMOVE_NOTIFICATION:
            return removeNotification(state, action.payload)
        case GlobalActionTypes.RECORD_USER_INFO:
            return recordUserInfo(state, action.payload)
        case GlobalActionTypes.REMOVE_USER_INFO:
            return removeUserInfo(state)
        case GlobalActionTypes.TOGGLE_USER_MENU:
            return toggleUserMenu(state, action.payload)
        case GlobalActionTypes.FRIEND_NOTIFICATION:
            return addFriendNotification(state)
        case GlobalActionTypes.CLEAR_FRIEND_NOTIFICATiONS:
            return clearFriendNotifications(state)
        default: return state
    }
}

