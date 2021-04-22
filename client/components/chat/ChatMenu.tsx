import React from 'react'
import { UserState } from '../../store/globalReducer'

type Props = {
    user: UserState
}

const ChatMenu = ({ user }: Props) => {
    return (
        <section className = "chat-menu">
            Chat meny component
        </section>
    )
}

export default ChatMenu