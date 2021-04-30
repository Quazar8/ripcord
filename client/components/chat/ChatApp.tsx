import React, { useEffect } from 'react'
import { UserState } from '../../store/globalReducer'
import { connect, MapDispatchFn, MapStateFn } from '../../store/store'
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
    showFriendsWindow: boolean
}

type DispProps = {
    showUserMenuFn: () => void
    hideUserMenuFn: () => void
    toggleFriendsWindowFn: () => void
    logoutFn: () => void
    dispNotification: ReturnType<typeof pushNotification>
}

type Props = StateProps & DispProps

const ChatAppView = (props: Props) => {
    let socket: WebSocket = null

    useEffect(() => {
        socket = new WebSocket('ws://localhost:8000')
        socket.onopen = (ev) => {
            console.log('socket connection is opened')
        }

        socket.onerror = (ev) => {
            console.log('Error connecting socket')
            props.dispNotification('error', 'Error connecting to the chat.')
        }

        socket.onmessage = (msg) => {
            console.log('received message', msg.data)
        }

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
            />
            <RightWindow 
                showFriendsWindow = { props.showFriendsWindow }
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
    showFriendsWindow: state.global.showFriendsWindow
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
    dispNotification: pushNotification(dispatch)
})

const ChatApp = connect(mapState, mapDisp)(ChatAppView)

export default ChatApp