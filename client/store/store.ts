import { useReducer, useMemo, Dispatch } from 'react'
import { GlobalState, globalInit, globalReducer} from './globalReducer'
import { GlobalAction } from './globalActions'
import { chatReducer, ChatState, chatStateInit } from './chat/chatReducer'
import { ChatAction, ChatActionTypes } from './chat/chatActions'

export * from './storeComponents/StoreProvider'
export * from './storeComponents/connect'
export * from './storeComponents/StoreTypes'

export type AppAction = GlobalAction | ChatAction

type AppState = GlobalState | ChatState

export type CombinedState = {
    global: GlobalState
    chat: ChatState
    [key: string]: AppState
}

export type StoreType = [CombinedState, Dispatch<AppAction>]

type ReducerSlices = {
    global: (state: GlobalState, action: GlobalAction) => GlobalState
    chat: (state: ChatState, action: ChatAction) => ChatState
    [key: string]: any
}

export const initialState: CombinedState = {
    global: globalInit,
    chat: chatStateInit
}

const combineReducers = 
    (slices: ReducerSlices) => (state: CombinedState, action: AppAction) => (
    Object.keys(slices).reduce((acc, prop: string) => ({
            ...acc,
            [prop]: slices[prop](acc[prop], action)
        }),
        state
    )
)

const rootReducer = combineReducers({ 
    global: globalReducer,
    chat: chatReducer
})

export const useStore = () => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const store: StoreType = useMemo(() => [state, dispatch], [state])
    console.log('state', state)
    return store
}