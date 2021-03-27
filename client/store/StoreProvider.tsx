import React, { createContext } from 'react'
import { useStore } from './store'

export const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
    const store = useStore()

    return (
        <StoreContext.Provider value = { store }>
            { children }
        </StoreContext.Provider>
    )
}