import { Action } from './storeComponents/StoreTypes'
import { GlobalActionTypes, Notification, IUser } from './globalActions'

export type UserState = IUser

export type GlobalState = {
    notifications: Notification[]
    user: UserState
    showUserOptions: boolean
    showFriendsWindow: boolean
    friendNotification: number
}

export const globalInit: GlobalState = {
    notifications: [],
    user: {
        username: ''
    },
    showUserOptions: false,
    showFriendsWindow: false,
    friendNotification: 0
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
    return { ...state, user}
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
        friendNotification: state.friendNotification + 1
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
        default: return state
    }
}

