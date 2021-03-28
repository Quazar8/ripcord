import React, { createContext, Dispatch, PropsWithChildren, ReactChild, ReactChildren } from 'react'
import { useStore, CombinedState, AppAction } from './store'

type store = (CombinedState | Dispatch<AppAction>)[]

export const StoreContext = createContext(null)

export const StoreProvider = ({ children }: PropsWithChildren<Object>) => {
    const store = useStore()

    return (
        <StoreContext.Provider value = { store }>
            { children }
        </StoreContext.Provider>
    )
}