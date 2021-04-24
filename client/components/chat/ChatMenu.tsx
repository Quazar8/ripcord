import React from 'react'
import { UserState } from '../../store/globalReducer'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'

type Props = {
    user: UserState,
    showUserMenuFn: () => void
}

const ChatMenu = ({ user, showUserMenuFn }: Props) => {
    return (
        <section className = "chat-menu">
            <ChatMenuButtons />
            <Nameplate 
                username = { user.username } 
                showUserMenuFn = { showUserMenuFn }
            />
        </section>
    )
}

export default ChatMenu