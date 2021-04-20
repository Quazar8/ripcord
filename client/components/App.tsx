import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { connect, MapDispatchFn, MapStateFn } from '../store/store'
import { getCookies } from '../../server/utils'
import { jwtCookieName } from '../../server/configVars'
import { getUserInfoWToken } from '../api/userApi'

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
    const retrieveUserFromToken = async () => {
        const res = await getUserInfoWToken()

        if (res.error) {
            return
        }

        console.log('res', res)
    }    

    useEffect(() => { 
        const token = getCookies(document.cookie)[jwtCookieName]
        if (!user.username && token) {
            retrieveUserFromToken()
        }
    }, [user.username])

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