import React from 'react'
import { UserState } from '../../store/globalReducer'
import { connect, MapDispatchFn, MapStateFn } from '../../store/store'
import { toggleUserMenuAction } from '../../store/globalActions'

import ChatDisplay from './ChatDisplay'
import ChatMenu from './ChatMenu'
import UserMenu from './UserMenu'

type StateProps = {
    user: UserState,
    showUserMenu: boolean
}

type DispProps = {
    showUserMenuFn: () => void
}

type Props = StateProps & DispProps

const ChatAppView = ({ user, showUserMenu, showUserMenuFn }: Props) => {
    return (
        <section className = "chat-app">
            <ChatMenu 
                user = { user }
                showUserMenuFn = { showUserMenuFn }
            />
            <ChatDisplay />
            <UserMenu showUserMenu = { showUserMenu } />
        </section>
    )
}

const mapState: MapStateFn<StateProps> = (state) => ({
    user: state.global.user,
    showUserMenu: state.global.showUserOptions
})

const mapDisp: MapDispatchFn<DispProps> = (dispatch) => ({
    showUserMenuFn: () => {
        dispatch(toggleUserMenuAction(true))
    }
})

const ChatApp = connect(mapState, mapDisp)(ChatAppView)

export default ChatApp