import { useReducer, useMemo } from 'react'
import { GlobalState, globalInit, globalReducer} from './globalReducer'
import { GlobalAction } from './globalActions'

type AppActions = GlobalAction

type CombinedState = {
    global: GlobalState
}

type ReducerSlices = {
    globalReducer: (state: GlobalState, action: GlobalAction) => GlobalState
}

const initialState: CombinedState = {
    global: globalInit
}

const combineReducers = 
    (slices: ReducerSlices) => (state: CombinedState, action: AppActions) => (
    Object.keys(slices).reduce((acc, prop) => ({
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