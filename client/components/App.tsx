import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider, connect, MapDispatchFn } from '../store/store'

import Navbar from './navbar/Navbar'
import Main from './Main'
import NotificationsContainer from './others/notifications/NotificationsContainer'
import { UserState } from '../store/globalReducer'
import { recordUserAction } from '../store/globalActions'

type DispProps = {
    recordUser: (user: UserState) => void
}

const AppView = () => {
    return (
        <BrowserRouter>
            <StoreProvider>
                <div>
                    <Navbar />
                    <Main />
                    <NotificationsContainer />
                </div>
            </StoreProvider>
        </BrowserRouter>
    )
}

const mapDispatch: MapDispatchFn<DispProps> = (dispatch) => ({
    recordUser: (user: UserState) => {
        dispatch(recordUserAction(user))
    }
})

const App = connect(null, mapDispatch)(AppView)

export default App