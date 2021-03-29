import React, { Context, createContext, Dispatch, PropsWithChildren, ReactChild, ReactChildren } from 'react'
import { useStore, CombinedState, AppAction } from './store'

type StoreType = (CombinedState | Dispatch<AppAction>)[]

export const StoreContext: Context<StoreType> = createContext([])

export const StoreProvider = ({ children }: PropsWithChildren<Object>) => {
    const store = useStore()

    return (
        <StoreContext.Provider value = { store }>
            { children }
        </StoreContext.Provider>
    )
}