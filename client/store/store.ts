import { useReducer, useMemo, Dispatch } from 'react'
import { GlobalState, globalInit, globalReducer} from './globalReducer'
import { GlobalAction } from './globalActions'
import { chatReducer, ChatState, chatStateInit } from './chat/chatReducer'
import { ChatAction } from './chat/chatActions'
import { FriendsState, friendsReducer, friendsStateInit } from './friends/friendsReducer'
import { FriendsAction } from './friends/friendsActions'

export * from './storeComponents/StoreProvider'
export * from './storeComponents/connect'
export * from './storeComponents/StoreTypes'

export type AppAction = GlobalAction | ChatAction | FriendsAction

type AppState = GlobalState | ChatState | FriendsState

export type CombinedState = {
    global: GlobalState
    chat: ChatState
    friends: FriendsState
    [key: string]: AppState
}

export type StoreType = [CombinedState, Dispatch<AppAction>]

type ReducerSlices = {
    global: (state: GlobalState, action: GlobalAction) => GlobalState
    chat: (state: ChatState, action: ChatAction) => ChatState
    friends: (state: FriendsState, action: FriendsAction) => FriendsState
    [key: string]: any
}

export const initialState: CombinedState = {
    global: globalInit,
    chat: chatStateInit,
    friends: friendsStateInit
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
    chat: chatReducer,
    friends: friendsReducer
})

export const useStore = () => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const store: StoreType = useMemo(() => [state, dispatch], [state])
    console.log('state', state)
    return store
}