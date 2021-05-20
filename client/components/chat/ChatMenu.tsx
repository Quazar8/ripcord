import React, { createContext } from 'react'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'
import ActiveChannels from './ChatMenu/ActiveChannels'
import { ChatAppProps } from './ChatApp'

type Props = Pick<ChatAppProps, "user" | "showUserMenuFn"
    | "friendNotifications"
    | "updateActiveChannelsFn" | "activeChannels" 
    | "changeChannelIdFn"> & {
        toggleChatWChannelId: (channelId: string) => void
        toggleFriendsWindowFn: () => void
    } 

type ChatMenuContext = Pick<ChatAppProps, "changeChannelIdFn">

export const ChatMenuContext = createContext<ChatMenuContext>({
    changeChannelIdFn: () => {}
})

const ChatMenu = (props: Props) => {
    const contextValue: ChatMenuContext = {
        changeChannelIdFn: props.changeChannelIdFn
    }

    return (
        <section className = "chat-menu">
            <ChatMenuContext.Provider value = { contextValue }>
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
            </ChatMenuContext.Provider>
        </section>
    )
}

export default ChatMenu