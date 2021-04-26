import React, { Dispatch, FunctionComponent, useContext } from 'react'
import { StoreContext } from './StoreProvider'
import { AppAction, CombinedState } from '../store'

export type MapStateFn<S> = ((state: CombinedState) => S) | null

export type MapDispatchFn<F> = ((dispatch: Dispatch<AppAction>, state?: CombinedState) => F) | null

export type Connector = <S, F>(mapState: MapStateFn<S>, mapDispatch: MapDispatchFn<F>) => (El: FunctionComponent<any>) => () => JSX.Element

export const connect: Connector = (mapState, mapDispatch) => (El) => {
    return () => {
        const [state, dispatch] = useContext(StoreContext)

        let stateToImport = {}
        if (mapState) 
            stateToImport = mapState(state)

        let dispMethodsToImport = {}
        if (mapDispatch)
            dispMethodsToImport = mapDispatch(dispatch, state)

        return  (
            <El 
                { ...stateToImport }
                { ...dispMethodsToImport }
            />
        )
    }
}
