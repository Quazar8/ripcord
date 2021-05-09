import React, { createContext } from 'react'
import ChatDisplay from './ChatDisplay'
import { ChatAppProps } from './ChatApp'

import FriendsWindow from './FriendsWindow/FriendsWindow'

type Props = {
    showFriendsWindow: ChatAppProps['showFriendsWindow'],
    dispNotification: ChatAppProps['dispNotification']
    showChatDisplayFn: ChatAppProps['showChatDisplayFn']
}

type RightWIndowContext = Pick<Props, 'dispNotification' | 'showChatDisplayFn'>

export const rightWindowContext = createContext({
    dispNotification: () => {},
    showChatDisplayFn: () => {}
})

const RightWindow = (props: Props) => {
    let AuxComponent: JSX.Element = null
    if (props.showFriendsWindow) {
       AuxComponent = <FriendsWindow 
            dispNotification = { props.dispNotification }
            showChatDisplayFn = { props.showChatDisplayFn }
        />
    }

    return (
        <section className = "right-window">
            <ChatDisplay />
            { AuxComponent }
        </section>
    )
}

export default RightWindow