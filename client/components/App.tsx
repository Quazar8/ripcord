import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { connect, MapDispatchFn, MapStateFn } from '../store/store'
import { getCookies } from '../../server/utils'
import { jwtCookieName } from '../../server/configVars'
import { resHasError } from '../api/utils'
import { getUserInfoWToken } from '../api/userApi'
import { incrementPendingNotif } from '../store/friends/friendsActions'

import Main from './Main'
import NotificationsContainer from './others/notifications/NotificationsContainer'
import { UserState } from '../store/globalReducer'
import { recordUserAction } from '../store/globalActions'

type StateProps = {
    user: UserState
}

type DispProps = {
    recordUser: (user: UserState) => void,
    setPendingNotifsAmount: (amount: number) => void
}

type Props = StateProps & DispProps

const AppView = (props: Props) => {
    const retrieveUserFromToken = async () => {
        const res = await getUserInfoWToken()

        if (resHasError(res)) {
            return
        }

        props.recordUser(res.data)
        props.setPendingNotifsAmount(res.data.incFriendRequests.length)
    }    

    useEffect(() => { 
        const token = getCookies(document.cookie)[jwtCookieName]
        if (!props.user.username && token) {
            retrieveUserFromToken()
        }
    }, [props.user.username])

    return (
        <BrowserRouter>
            <div className = "app-container">
                <Main user = { props.user }/>
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
    },
    setPendingNotifsAmount: (amount: number) => {
        dispatch(incrementPendingNotif(amount))
    }
})

const App = connect(mapState, mapDispatch)(AppView)

export default App