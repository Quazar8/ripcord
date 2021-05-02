import React from 'react'
import ChatDisplay from './ChatDisplay'
import { pushNotification } from '../../store/globalActions'

import FriendsWindow from './FriendsWindow'

type Props = {
    showFriendsWindow: boolean,
    dispNotification: ReturnType<typeof pushNotification>
}

const RightWindow = (props: Props) => {
    let AuxComponent: JSX.Element = null
    if (props.showFriendsWindow) {
       AuxComponent = <FriendsWindow 
            dispNotification = { props.dispNotification }
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