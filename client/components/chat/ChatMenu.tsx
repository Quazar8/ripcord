import React from 'react'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'
import ActiveChannels from './ChatMenu/ActiveChannels'
import { ChatAppProps } from './ChatApp'

type Props = Pick<ChatAppProps, "user" | "showUserMenuFn"
    | "toggleFriendsWindowFn" | "friendNotifications">

const ChatMenu = (props: Props) => {
    return (
        <section className = "chat-menu">
            <ChatMenuButtons 
                toggleFriendsWindowFn = { props.toggleFriendsWindowFn }
                friendNotifications = { props.friendNotifications }
            />
            <ActiveChannels />
            <Nameplate 
                username = { props.user.username } 
                showUserMenuFn = { props.showUserMenuFn }
            />
        </section>
    )
}

export default ChatMenu