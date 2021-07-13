import React, { createContext } from 'react'
import ChatDisplay from './ChatDisplay'
import { ChatAppProps } from '../ChatApp'

import FriendsWindow from './FriendsWindow/FriendsWindow'
import { ActiveChannelInfo } from '../../../../server/types/ChatTypes'

export type RightWindowProps = Pick<ChatAppProps, 'dispNotification'
        | 'recipientId' | 'user' 
        | 'channelId'
        | 'updateChannelInfoFn' | 'channelInfo'
        | 'pushSentMsgToStoreFn' | 'markMsgAsFailedFn' 
        | 'appendActiveChannelFn' | 'moveActiveChToTopFn'
        | 'fillFriendRequestsFn' | 'removeFriendRequestFn'
        | 'clearPendingButtonNotifFn'
        | 'fillFriendsListFn' | 'friendsState'
        | 'removeFriendFromListFn' | 'callState'
        | 'callFns'> & {
            toggleChatWRecipientId: (recipientId: string) => void
            showFriendsWindow: boolean,
            activeChannels: ActiveChannelInfo[]
        }

type RightContextType = Pick<RightWindowProps, 'dispNotification' 
     | 'toggleChatWRecipientId' | 'fillFriendRequestsFn'
     | 'removeFriendRequestFn'
     | 'clearPendingButtonNotifFn'
     | 'fillFriendsListFn'
     | 'removeFriendFromListFn'
     | 'callFns'> 
     & Pick<RightWindowProps['friendsState'], 'pendingRequests'
     | 'friendsList' | 'friendRequests'>

export const RightWindowContext = createContext<RightContextType>({
    friendRequests: { incoming: [], outgoing: []},
    pendingRequests: 0,
    friendsList: { online: [], offline: [] },
    dispNotification: () => {},
    toggleChatWRecipientId: () => {},
    fillFriendRequestsFn: () => {},
    removeFriendRequestFn: () => {},
    clearPendingButtonNotifFn: () => {},
    fillFriendsListFn: () => {},
    removeFriendFromListFn: () => {},
    callFns: {
        hangUpCall: () => {}
    }
}) 

const RightWindow = (props: RightWindowProps) => {
    let AuxComponent: JSX.Element = null
    if (props.showFriendsWindow) {
       AuxComponent = <FriendsWindow 
            dispNotification = { props.dispNotification }
        />
    }

    const contextValue: RightContextType = {
        friendsList: props.friendsState.friendsList,
        friendRequests: props.friendsState.friendRequests,
        pendingRequests: props.friendsState.pendingRequests,
        dispNotification: props.dispNotification,
        toggleChatWRecipientId: props.toggleChatWRecipientId,
        fillFriendRequestsFn: props.fillFriendRequestsFn,
        removeFriendRequestFn: props.removeFriendRequestFn,
        clearPendingButtonNotifFn: props.clearPendingButtonNotifFn,
        fillFriendsListFn: props.fillFriendsListFn,
        removeFriendFromListFn: props.removeFriendFromListFn,
        callFns: props.callFns
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
                    callState = { props.callState }
                />
                { AuxComponent }
            </RightWindowContext.Provider>
        </section>
    )
}

export default RightWindow