import React, { createContext } from 'react'
import ChatDisplay from './ChatDisplay'
import { ChatAppProps } from './ChatApp'

import FriendsWindow from './FriendsWindow/FriendsWindow'

type Props = Pick<ChatAppProps, 'dispNotification'
                 | 'showFriendsWindow'
                 | 'recipientId' | 'user' | 'channelId'> & {
                     toggleChatWRecipientId: (recipientId: string) => void
                 }

type RightContextType = Pick<Props, 'dispNotification' 
     | 'toggleChatWRecipientId'>

export const RightWindowContext = createContext<RightContextType>({
    dispNotification: () => {},
    toggleChatWRecipientId: () => {}
})

const RightWindow = (props: Props) => {
    let AuxComponent: JSX.Element = null
    if (props.showFriendsWindow) {
       AuxComponent = <FriendsWindow 
            dispNotification = { props.dispNotification }
        />
    }

    const contextValue: RightContextType = {
        dispNotification: props.dispNotification,
        toggleChatWRecipientId: props.toggleChatWRecipientId
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
                />
                { AuxComponent }
            </RightWindowContext.Provider>
        </section>
    )
}

export default RightWindow