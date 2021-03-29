import React, { Context, createContext, Dispatch, PropsWithChildren } from 'react'
import { useStore, StoreType, initialState } from './store'

const initialContext: StoreType = [initialState, (value) => {}]

export const StoreContext: Context<StoreType> = createContext(initialContext)

export const StoreProvider = ({ children }: PropsWithChildren<Object>) => {
    const store: StoreType = useStore()

    return (
        <StoreContext.Provider value = { store }>
            { children }
        </StoreContext.Provider>
    )
}