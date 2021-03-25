import { useReducer } from 'react'

const initialState = {
    notifications: []
}

const reducer = (state, action) => {
    switch (action.type) {
        default: return state
    }
}

const [state, dispatch] = useReducer(reducer, initialState)

export {
    state,
    dispatch
}