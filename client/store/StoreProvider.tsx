import React, { createContext, PropsWithChildren, ReactChild, ReactChildren } from 'react'
import { useStore } from './store'

export const StoreContext = createContext(null)

export const StoreProvider = ({ children }: PropsWithChildren<Object>) => {
    const store = useStore()

    return (
        <StoreContext.Provider value = { store }>
            { children }
        </StoreContext.Provider>
    )
}