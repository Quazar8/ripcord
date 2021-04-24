import React from 'react'
import { UserState } from '../../store/globalReducer'
import { connect, MapStateFn } from '../../store/store'

import ChatDisplay from './ChatDisplay'
import ChatMenu from './ChatMenu'
import UserMenu from './UserMenu'

type StateProps = {
    user: UserState,
    showUserMenu: boolean
}

const ChatAppView = ({ user, showUserMenu }: StateProps) => {
    return (
        <section className = "chat-app">
            <ChatMenu user = { user } />
            <ChatDisplay />
            <UserMenu showUserMenu = { showUserMenu } />
        </section>
    )
}

const mapState: MapStateFn<StateProps> = (state) => ({
    user: state.global.user,
    showUserMenu: state.global.showUserOptions
})

const ChatApp = connect(mapState, null)(ChatAppView)

export default ChatApp