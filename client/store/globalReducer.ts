import { Action } from './StoreTypes'
import { GlobalPayloads, GlobalActionTypes, Notification } from './globalActions'

export type GlobalState = {
    notifications: Array<Notification>
}

export const globalInit: GlobalState = {
    notifications: []
}

const pushNotification = (currentState: GlobalState = globalInit, notification: Notification): GlobalState => {
    const newState = Object.assign({}, currentState)
    newState.notifications.push(notification)

    return newState
}

const removeNotification = (state, payload) => {
    return state
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

