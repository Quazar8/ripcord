import { useReducer } from 'react'
import { Action } from './StoreTypes'
import { GlobalType, GlobalActionTypes, Notification } from './globalActions'

type GlobalState = {
    notifications: Array<Notification>
}

const initialState: GlobalState = {
    notifications: []
}

const pushNotification = (currentState: GlobalState, notification: Notification): GlobalState => {
    const newState = Object.assign({}, currentState)
    newState.notifications.push(notification)
    
    return newState
}

const reducer = 
        (state: GlobalState, action: Action<GlobalType, GlobalActionTypes>): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.PushNotification:
            return pushNotification(state, action.payload)
        default: return state
    }
}

const [state, dispatch] = useReducer(reducer, initialState)

export {
    state,
    dispatch
}