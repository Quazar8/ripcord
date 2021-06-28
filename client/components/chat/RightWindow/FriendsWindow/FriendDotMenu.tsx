import React, { MouseEvent } from 'react'
import { requestUserUnfriend } from '../../../../api/userApi'
import { resHasError } from '../../../../api/utils'

type Props = {
    friendId: string
}

const FriendDotMenu = (props: Props) => {
    const unfriendUser = async (ev: MouseEvent) => {
        ev.stopPropagation()

        const res = await requestUserUnfriend(props.friendId)

        if (resHasError(res)) {
            console.log('Error unfriending user', res.errorMsg)
            return
        }

        console.log('Unfriending success')
    }

    return (
        <div className = "friend-dot-menu-container">
            <button className = "friend-menu-button">
                <span>&#9898;</span>
                <span>&#9898;</span>
                <span>&#9898;</span>
            </button>
            <div className = "menu">
                <button onClick = { unfriendUser }>Unfriend</button>
            </div>
        </div>
    )
}

export default FriendDotMenu