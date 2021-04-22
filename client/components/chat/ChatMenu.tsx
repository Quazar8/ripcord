import React from 'react'
import { UserState } from '../../store/globalReducer'
import NamePlate from './Nameplate'

import Nameplate from './Nameplate'

type Props = {
    user: UserState
}

const ChatMenu = ({ user }: Props) => {
    return (
        <section className = "chat-menu">
            <NamePlate username = { user.username } />
        </section>
    )
}

export default ChatMenu