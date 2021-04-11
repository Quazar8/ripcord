import { Action } from './StoreTypes'
import { GlobalActionTypes, Notification, IUser } from './globalActions'

export type GlobalState = {
    notifications: Notification[],
    user: IUser
}

export const globalInit: GlobalState = {
    notifications: [],
    user: {
        username: ''
    }
}

const pushNotification = (currentState: GlobalState = globalInit, notification: Notification): GlobalState => {
    const newState = { ...currentState }
    newState.notifications.push(notification)

    return newState
}

const removeNotification = (state: GlobalState, payload: Notification['id']) => {
    const newState = {...state}
    for (let [i, not] of newState.notifications.entries()) {
        if (not.id === payload) {
            newState.notifications.splice(i, 1)
            break
        }
    }

    return newState
}

const recordUserInfo = (state: GlobalState, user: IUser): GlobalState => {
    return { ...state, user }
}

const removeUserInfo = (state: GlobalState): GlobalState => {
    const newState = { ...state, user: globalInit.user }
    return newState
}

export const globalReducer = 
        (state: GlobalState, action: Action<GlobalActionTypes, any>): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.PushNotification:
            return pushNotification(state, action.payload)
        case GlobalActionTypes.RemoveNotification:
            return removeNotification(state, action.payload)
        case GlobalActionTypes.RecordUserInfo:
            return recordUserInfo(state, action.payload)
        case GlobalActionTypes.RemoveUserInfo:
            return removeUserInfo(state)
        default: return state
    }
}

