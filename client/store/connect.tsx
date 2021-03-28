import React, { Component } from 'react'
import { StoreContext } from './StoreProvider'

export const connect = (mapState, mapDispatch) => (El: typeof Component) => {
    const context = StoreContext

    const stateToImport = mapState(context)

    return <El { ...stateToImport } />
}
