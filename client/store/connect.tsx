import React, { Component, ComponentFactory, ComponentType, Dispatch, FunctionComponent, FunctionComponentFactory, JSXElementConstructor, ReactElement, useContext } from 'react'
import { StoreContext } from './StoreProvider'
import { AppAction, CombinedState } from './store'

export type MapStateFn = (state: CombinedState) => Object

export type MapDispatchFn = (dispatch: Dispatch<AppAction>) => Object

export type Connector = (mapState: MapStateFn, mapDispatch: MapDispatchFn) => (El: FunctionComponent<any>) => () => JSX.Element

export const connect: Connector = (mapState, mapDispatch) => (El) => {
    return () => {
        const [state, dispatch] = useContext(StoreContext)

        const stateToImport = mapState(state)

        const dispMethodsToImport = mapDispatch(dispatch)

        return  (
            <El 
                { ...stateToImport }
                { ...dispMethodsToImport }
            />
        )
    }
}
