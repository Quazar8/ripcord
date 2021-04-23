import React from 'react'
import { UserState } from '../../store/globalReducer'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'

type Props = {
    user: UserState
}

const ChatMenu = ({ user }: Props) => {
    return (
        <section className = "chat-menu">
            <ChatMenuButtons />
            <Nameplate username = { user.username } />
        </section>
    )
}

export default ChatMenu