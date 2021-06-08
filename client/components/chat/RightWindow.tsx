import React, { createContext } from 'react'
import ChatDisplay from './ChatDisplay'
import { ChatAppProps } from './ChatApp'

import FriendsWindow from './FriendsWindow/FriendsWindow'
import { ActiveChannelInfo } from '../../../server/types/ChatTypes'

export type RightWindowProps = Pick<ChatAppProps, 'dispNotification'
        | 'recipientId' 
        | 'user' 
        | 'channelId'
        | 'friendRequests'
        | 'updateChannelInfoFn' | 'channelInfo'
        | 'pushSentMsgToStoreFn'
        | 'markMsgAsFailedFn' 
        | 'appendActiveChannelFn'
        | 'moveActiveChToTopFn'
        | 'fillFriendRequestsFn'
        | 'removeFriendRequestFn'
        | 'pendingRequests'> & {
            toggleChatWRecipientId: (recipientId: string) => void
            showFriendsWindow: boolean,
            activeChannels: ActiveChannelInfo[]
        }

type RightContextType = Pick<RightWindowProps, 'dispNotification' 
     | 'toggleChatWRecipientId' | 'fillFriendRequestsFn'
     | 'friendRequests' | 'removeFriendRequestFn'
     | 'pendingRequests'>

export const RightWindowContext = createContext<RightContextType>({
    friendRequests: { incoming: [], outgoing: []},
    pendingRequests: 0,
    dispNotification: () => {},
    toggleChatWRecipientId: () => {},
    fillFriendRequestsFn: () => {},
    removeFriendRequestFn: () => {}
}) 

const RightWindow = (props: RightWindowProps) => {
    let AuxComponent: JSX.Element = null
    if (props.showFriendsWindow) {
       AuxComponent = <FriendsWindow 
            dispNotification = { props.dispNotification }
        />
    }

    const contextValue: RightContextType = {
        friendRequests: props.friendRequests,
        dispNotification: props.dispNotification,
        toggleChatWRecipientId: props.toggleChatWRecipientId,
        fillFriendRequestsFn: props.fillFriendRequestsFn,
        removeFriendRequestFn: props.removeFriendRequestFn,
        pendingRequests: props.pendingRequests
    }

    return (
        <section className = "right-window">
            <RightWindowContext.Provider
                value = { contextValue }
            >
                <ChatDisplay 
                    dispNotification = { props.dispNotification }
                    recipientId = { props.recipientId }
                    user = { props.user }
                    channelId = { props.channelId }
                    updateChannelInfoFn = { props.updateChannelInfoFn }
                    channelInfo = { props.channelInfo }
                    pushSentMsgToStoreFn = { props.pushSentMsgToStoreFn }
                    markMsgAsFailedFn = { props.markMsgAsFailedFn }
                    appendActiveChannelFn = { props.appendActiveChannelFn }
                    activeChannels = { props.activeChannels }
                    moveActiveChToTopFn = { props.moveActiveChToTopFn }
                />
                { AuxComponent }
            </RightWindowContext.Provider>
        </section>
    )
}

export default RightWindow