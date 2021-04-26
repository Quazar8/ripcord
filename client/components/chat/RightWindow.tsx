import React from 'react'
import ChatDisplay from './ChatDisplay'

import FriendsWindow from './FriendsWindow'

type Props = {
    showFriendsWindow: boolean
}

const RightWindow = (props: Props) => {
    let AuxComponent: JSX.Element = null
    if (props.showFriendsWindow) {
       AuxComponent = <FriendsWindow />
    }

    return (
        <section className = "right-window">
            <ChatDisplay />
            { AuxComponent }
        </section>
    )
}

export default RightWindow