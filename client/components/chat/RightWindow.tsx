import React, { createContext } from 'react'
import ChatDisplay from './ChatDisplay'
import { ChatAppProps } from './ChatApp'

import FriendsWindow from './FriendsWindow/FriendsWindow'
import { ActiveChannelInfo } from '../../../server/types/ChatTypes'

export type RightWindowProps = Pick<ChatAppProps, 'dispNotification'
        | 'recipientId' | 'user' | 'channelId'
        | 'updateChannelInfoFn' | 'channelInfo'
        | 'pushSentMsgToStoreFn'
        | 'markMsgAsFailedFn' 
        | 'appendActiveChannelFn'> & {
            toggleChatWRecipientId: (recipientId: string) => void
            showFriendsWindow: boolean,
            activeChannels: ActiveChannelInfo[]
        }

type RightContextType = Pick<RightWindowProps, 'dispNotification' 
     | 'toggleChatWRecipientId'>

export const RightWindowContext = createContext<RightContextType>({
    dispNotification: () => {},
    toggleChatWRecipientId: () => {}
})

const RightWindow = (props: RightWindowProps) => {
    let AuxComponent: JSX.Element = null
    if (props.showFriendsWindow) {
       AuxComponent = <FriendsWindow 
            dispNotification = { props.dispNotification }
        />
    }

    const contextValue: RightContextType = {
        dispNotification: props.dispNotification,
        toggleChatWRecipientId: props.toggleChatWRecipientId,
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
                />
                { AuxComponent }
            </RightWindowContext.Provider>
        </section>
    )
}

export default RightWindow