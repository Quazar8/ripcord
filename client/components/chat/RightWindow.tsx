import React from 'react'
import ChatDisplay from './ChatDisplay'

type Props = {
    showFriendsWindow: boolean
}

const RightWindow = (props: Props) => {
    return (
        <section className = "right-window">
            <ChatDisplay />
        </section>
    )
}

export default RightWindow