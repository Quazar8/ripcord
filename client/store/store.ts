import { useReducer, useMemo } from 'react'
import { GlobalState, globalInit, globalReducer} from './globalReducer'
import { GlobalAction } from './globalActions'

type AppAction = GlobalAction

type AppState = GlobalState

type CombinedState = {
    global: GlobalState
    [key: string]: AppState
}

type ReducerSlices = {
    globalReducer: (state: GlobalState, action: GlobalAction) => GlobalState
    [key: string]: (state: AppState, action: AppAction) => AppState
}

const initialState: CombinedState = {
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

const rootReducer = combineReducers({ globalReducer })

export const useStore = () => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const store = useMemo(() => [state, dispatch], [state])

    return store
}