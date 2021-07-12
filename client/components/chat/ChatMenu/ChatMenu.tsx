import React, { createContext } from 'react'

import Nameplate from './Nameplate'
import ChatMenuButtons from './ChatMenuButtons'
import ActiveChannels from './ActiveChannels'
import { ChatAppProps } from '../ChatApp'

export type ChatMenuProps = Pick<ChatAppProps, 'user'
    | 'showUserMenuFn'
    | 'updateActiveChannelsFn'
    | 'activeChannels'
    | 'removeChannelFromListFn'
    | 'clearFriendButtonNotifFn'
    | 'clearActiveChannelNotifFn'> & {
        toggleChatWChannelId: (channelId: string) => void
        toggleFriendsWindowFn: () => void
        friendNotifications: ChatAppProps['friendsState']['friendNotifications']
    } 

type ChatMenuContext = Pick<ChatMenuProps, 'toggleChatWChannelId'
    | 'removeChannelFromListFn' | 'clearActiveChannelNotifFn'>

export const ChatMenuContext = createContext<ChatMenuContext>({
    toggleChatWChannelId: () => {},
    removeChannelFromListFn: () => {},
    clearActiveChannelNotifFn: () => {},
})

const ChatMenu = (props: ChatMenuProps) => {
    const contextValue: ChatMenuContext = {
        toggleChatWChannelId: props.toggleChatWChannelId,
        removeChannelFromListFn: props.removeChannelFromListFn,
        clearActiveChannelNotifFn: props.clearActiveChannelNotifFn,
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
                    profilePic = { props.user.profilePic }
                    showUserMenuFn = { props.showUserMenuFn }
                />
            </ChatMenuContext.Provider>
        </section>
    )
}

export default ChatMenu