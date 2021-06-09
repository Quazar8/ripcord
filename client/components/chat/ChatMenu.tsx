import React, { createContext } from 'react'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'
import ActiveChannels from './ChatMenu/ActiveChannels'
import { ChatAppProps } from './ChatApp'

type Props = Pick<ChatAppProps, 'user'
    | 'showUserMenuFn'
    | 'friendNotifications'
    | 'updateActiveChannelsFn'
    | 'activeChannels'
    | 'removeChannelFromListFn'
    | 'clearFriendButtonNotifFn'> & {
        toggleChatWChannelId: (channelId: string) => void
        toggleFriendsWindowFn: () => void
    } 

type ChatMenuContext = Pick<Props, 'toggleChatWChannelId'
    | 'removeChannelFromListFn' | 'clearFriendButtonNotifFn'>

export const ChatMenuContext = createContext<ChatMenuContext>({
    toggleChatWChannelId: () => {},
    removeChannelFromListFn: () => {},
    clearFriendButtonNotifFn: () => {}
})

const ChatMenu = (props: Props) => {
    const contextValue: ChatMenuContext = {
        toggleChatWChannelId: props.toggleChatWChannelId,
        removeChannelFromListFn: props.removeChannelFromListFn,
        clearFriendButtonNotifFn: props.clearFriendButtonNotifFn
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