import React, { Component } from 'react'
import { StoreContext } from './StoreProvider'

export const connect = (El: typeof Component) => {
    const context = StoreContext
    return <El storeState = { context } />
}
