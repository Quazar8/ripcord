import React from 'react'
import { UserState } from '../../store/globalReducer'
import { connect, MapDispatchFn, MapStateFn } from '../../store/store'
import { toggleUserMenuAction, removeUserInfoAction, toggleFriendsWindow } from '../../store/globalActions'
import { logoutUser } from '../../api/userApi'
import { resHasError } from '../../api/utils'

import RightWindow from './RightWindow'
import ChatMenu from './ChatMenu'
import UserMenu from './UserMenu'

type StateProps = {
    user: UserState,
    showUserMenu: boolean,
    showFriendsWindow: boolean,
}

type DispProps = {
    showUserMenuFn: () => void,
    hideUserMenuFn: () => void,
    showFriendsWindowFn: () => void,
    logoutFn: () => void
}

type Props = StateProps & DispProps

const ChatAppView = (props: Props) => {
    return (
        <section className = "chat-app">
            <ChatMenu 
                user = { props.user }
                showUserMenuFn = { props.showUserMenuFn }
                showFriendsWindowFn = { props.showFriendsWindowFn }
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

const mapDisp: MapDispatchFn<DispProps> = (dispatch) => ({
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
    showFriendsWindowFn: () => {
        dispatch(toggleFriendsWindow(true))
    }
})

const ChatApp = connect(mapState, mapDisp)(ChatAppView)

export default ChatApp