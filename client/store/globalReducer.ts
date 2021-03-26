import { useReducer } from 'react'
import { Action } from './StoreTypes'
import { GlobalType, GlobalActionTypes, Notification } from './globalActions'

type GlobalState = {
    notifications: Array<Notification>
}

const initialState: GlobalState = {
    notifications: []
}

const reducer = 
        (state: GlobalState, action: Action<GlobalType, GlobalActionTypes>): GlobalState => {
    switch (action.type) {
        default: return state
    }
}

const [state, dispatch] = useReducer(reducer, initialState)

export {
    state,
    dispatch
}