import React from 'react'

type Props = {
    friendId: string
}

const FriendDotMenu = (props: Props) => {
    return (
        <div className = "friend-dot-menu-container">
            <button className = "friend-menu-button">
                <span>&#9898;</span>
                <span>&#9898;</span>
                <span>&#9898;</span>
            </button>
            <div className = "menu">
                <button>Unfriend</button>
            </div>
        </div>
    )
}

export default FriendDotMenu