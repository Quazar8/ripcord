import React, { Dispatch, FunctionComponent, useContext } from 'react'
import { StoreContext } from './StoreProvider'
import { AppAction, CombinedState } from './store'

export type MapStateFn = ((state: CombinedState) => Object) | null

export type MapDispatchFn = ((dispatch: Dispatch<AppAction>) => Object) | null

export type Connector = (mapState: MapStateFn, mapDispatch: MapDispatchFn) => (El: FunctionComponent<any>) => () => JSX.Element

export const connect: Connector = (mapState, mapDispatch) => (El) => {
    return () => {
        const [state, dispatch] = useContext(StoreContext)

        let stateToImport = {}
        if (mapState) 
            stateToImport = mapState(state)

        let dispMethodsToImport = {}
        if (mapDispatch)
            dispMethodsToImport = mapDispatch(dispatch)

        return  (
            <El 
                { ...stateToImport }
                { ...dispMethodsToImport }
            />
        )
    }
}
