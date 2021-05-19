import React, { createContext } from 'react'
import ChatDisplay from './ChatDisplay'
import { ChatAppProps } from './ChatApp'

import FriendsWindow from './FriendsWindow/FriendsWindow'

type Props = Pick<ChatAppProps, 'dispNotification'
                 | 'showChatDisplayFn' | 'showFriendsWindow'
                 | 'recipientId' | 'user' | 'channelId'>

type RightContextType = Pick<Props, 'dispNotification' 
    | 'showChatDisplayFn'>

export const RightWindowContext = createContext<RightContextType>({
    dispNotification: () => {},
    showChatDisplayFn: () => {}
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
        showChatDisplayFn: props.showChatDisplayFn
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