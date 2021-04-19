import { useReducer, useMemo, Dispatch } from 'react'
import { GlobalState, globalInit, globalReducer} from './globalReducer'
import { GlobalAction } from './globalActions'
export * from './storeComponents/StoreProvider'
export * from './storeComponents/connect'
export * from './storeComponents/StoreTypes'

export type AppAction = GlobalAction

type AppState = GlobalState

export type CombinedState = {
    global: GlobalState
    [key: string]: AppState
}

export type StoreType = [CombinedState, Dispatch<AppAction>]

type ReducerSlices = {
    global: (state: GlobalState, action: GlobalAction) => GlobalState
    [key: string]: (state: AppState, action: AppAction) => AppState
}

export const initialState: CombinedState = {
    global: globalInit
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

const rootReducer = combineReducers({ global: globalReducer })

export const useStore = () => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const store: StoreType = useMemo(() => [state, dispatch], [state])
    console.log('state', state)
    return store
}