import React, { createContext } from 'react'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'
import ActiveChannels from './ChatMenu/ActiveChannels'
import { ChatAppProps } from './ChatApp'

export type ChatMenuProps = Pick<ChatAppProps, 'user'
    | 'showUserMenuFn'
    | 'friendNotifications'
    | 'updateActiveChannelsFn'
    | 'activeChannels'
    | 'removeChannelFromListFn'
    | 'clearFriendButtonNotifFn'> & {
        toggleChatWChannelId: (channelId: string) => void
        toggleFriendsWindowFn: () => void
    } 

type ChatMenuContext = Pick<ChatMenuProps, 'toggleChatWChannelId'
    | 'removeChannelFromListFn'>

export const ChatMenuContext = createContext<ChatMenuContext>({
    toggleChatWChannelId: () => {},
    removeChannelFromListFn: () => {},
})

const ChatMenu = (props: ChatMenuProps) => {
    const contextValue: ChatMenuContext = {
        toggleChatWChannelId: props.toggleChatWChannelId,
        removeChannelFromListFn: props.removeChannelFromListFn,
    }

    return (
        <section className = "chat-menu">
            <ChatMenuContext.Provider value = { contextValue }>
                <ChatMenuButtons 
                    toggleFriendsWindowFn = { props.toggleFriendsWindowFn }
                    friendNotifications = { props.friendNotifications }
                    clearFriendButtonNotifFn = { props.clearFriendButtonNotifFn }
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