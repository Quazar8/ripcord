import React, { Dispatch, useEffect } from 'react'
import { establishWS, socket } from '../../socket/socket'
import { UserState } from '../../store/globalReducer'
import { AppAction, connect, MapDispatchFn, MapStateFn } from '../../store/store'
import { logoutUser } from '../../api/userApi'
import { resHasError } from '../../api/utils'
import { toggleUserMenuAction, 
         removeUserInfoAction, 
         toggleFriendsWindow,
         pushNotification } from '../../store/globalActions'

import RightWindow from './RightWindow'
import ChatMenu from './ChatMenu'
import UserMenu from './UserMenu'

type StateProps = {
    user: UserState
    showUserMenu: boolean
    showFriendsWindow: boolean,
    friendNotifications: number
}

type DispProps = {
    showUserMenuFn: () => void
    hideUserMenuFn: () => void
    toggleFriendsWindowFn: () => void
    logoutFn: () => void
    dispNotification: ReturnType<typeof pushNotification>,
    dispatch: Dispatch<AppAction>
}

type Props = StateProps & DispProps

const ChatAppView = (props: Props) => {
    useEffect(() => {
        establishWS(props.dispatch)

        return () => {
            socket.close()
        }
    }, [])

    return (
        <section className = "chat-app">
            <ChatMenu 
                user = { props.user }
                showUserMenuFn = { props.showUserMenuFn }
                toggleFriendsWindowFn = { props.toggleFriendsWindowFn }
                friendNotifications = { props.friendNotifications }
            />
            <RightWindow 
                showFriendsWindow = { props.showFriendsWindow }
                dispNotification = { props.dispNotification }
            />
            <UserMenu 
                showUserMenu = { props.showUserMenu }
                hideUserMenuFn = { props.hideUserMenuFn }
                logoutFn = { props.logoutFn }
            />
        </section>
    )
}

const mapState: MapStateFn<StateProps> = (state) => ({
    user: state.global.user,
    showUserMenu: state.global.showUserOptions,
    showFriendsWindow: state.global.showFriendsWindow,
    friendNotifications: state.global.friendNotification
})

const mapDisp: MapDispatchFn<DispProps> = (dispatch, state) => ({
    showUserMenuFn: () => {
        dispatch(toggleUserMenuAction(true))
    },
    hideUserMenuFn: () => {
        dispatch(toggleUserMenuAction(false))
    },
    logoutFn: async () => {
        const res = await logoutUser()

        if (resHasError(res)) return

        dispatch(removeUserInfoAction())
    },
    toggleFriendsWindowFn: () => {
        dispatch(toggleFriendsWindow(!state.global.showFriendsWindow))
    },
    dispNotification: pushNotification(dispatch),
    dispatch
})

const ChatApp = connect(mapState, mapDisp)(ChatAppView)

export default ChatApp