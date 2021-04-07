import { Action } from './StoreTypes'
import { GlobalActionTypes, Notification } from './globalActions'

export type GlobalState = {
    notifications: Notification[]
}

export const globalInit: GlobalState = {
    notifications: []
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
            newState.notifications.splice(i)
            break
        }
    }

    return newState
}

export const globalReducer = 
        (state: GlobalState, action: Action<GlobalActionTypes, any>): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.PushNotification:
            return pushNotification(state, action.payload)
        case GlobalActionTypes.RemoveNotification:
            return removeNotification(state, action.payload)
        default: return state
    }
}

