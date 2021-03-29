import React, { Component, useContext } from 'react'
import { StoreContext } from './StoreProvider'

export const connect = (mapState, mapDispatch) => (El: typeof Component) => {
    const [state, dispatch] = useContext(StoreContext)

    const stateToImport = mapState(state)

    const dispMethodsToImport = mapDispatch(dispatch)

    return (
        <El 
            { ...stateToImport }
            { ...dispMethodsToImport }
        />
    )
}
