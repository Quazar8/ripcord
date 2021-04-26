import React from 'react'
import { UserState } from '../../store/globalReducer'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'

type Props = {
    user: UserState,
    showUserMenuFn: () => void,
    showFriendsWindowFn: () => void
}

const ChatMenu = (props: Props) => {
    return (
        <section className = "chat-menu">
            <ChatMenuButtons />
            <Nameplate 
                username = { props.user.username } 
                showUserMenuFn = { props.showUserMenuFn }
            />
        </section>
    )
}

export default ChatMenu