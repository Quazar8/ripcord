import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider, connect, MapDispatchFn, MapStateFn } from '../store/store'

import Navbar from './navbar/Navbar'
import Main from './Main'
import NotificationsContainer from './others/notifications/NotificationsContainer'
import { UserState } from '../store/globalReducer'
import { recordUserAction } from '../store/globalActions'

type StateProps = {
    user: UserState
}

type DispProps = {
    recordUser: (user: UserState) => void
}

type Props = StateProps & DispProps

const AppView = ({ user }: Props) => {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Main />
                <NotificationsContainer />
            </div>
        </BrowserRouter>
    )
}

const mapState: MapStateFn<StateProps> = (state) => ({
    user: state.global.user
})

const mapDispatch: MapDispatchFn<DispProps> = (dispatch) => ({
    recordUser: (user: UserState) => {
        dispatch(recordUserAction(user))
    }
})

const App = connect(mapState, mapDispatch)(AppView)

export default App