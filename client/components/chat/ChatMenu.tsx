import React, { createContext } from 'react'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'
import ActiveChannels from './ChatMenu/ActiveChannels'
import { ChatAppProps } from './ChatApp'

type Props = Pick<ChatAppProps, "user" | "showUserMenuFn"
    | "toggleFriendsWindowFn" | "friendNotifications"
    | "updateActiveChannelsFn" | "activeChannels" 
    | "changeChannelIdFn">

const ChatMenu = (props: Props) => {
    return (
        <section className = "chat-menu">
            <ChatMenuButtons 
                toggleFriendsWindowFn = { props.toggleFriendsWindowFn }
                friendNotifications = { props.friendNotifications }
            />
            <ActiveChannels 
                updateActiveChannelsFn = { props.updateActiveChannelsFn }
                activeChannels = { props.activeChannels }
            />
            <Nameplate 
                username = { props.user.username } 
                showUserMenuFn = { props.showUserMenuFn }
            />
        </section>
    )
}

export default ChatMenu