import React, { MouseEvent, useState } from 'react'
import { requestUserUnfriend } from '../../../../api/userApi'
import { resHasError } from '../../../../api/utils'

type Props = {
    friendId: string
}

const FriendDotMenu = (props: Props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const unfriendUser = async (ev: MouseEvent) => {
        ev.stopPropagation()

        const res = await requestUserUnfriend(props.friendId)

        if (resHasError(res)) {
            console.log('Error unfriending user', res.errorMsg)
            return
        }

        console.log('Unfriending success')
    }

    const toggleMenu = (ev: MouseEvent) => {
        ev.stopPropagation()
        setShowMenu(!showMenu)
    }

    return (
        <div className = "friend-dot-menu-container">
            <button onClick = { toggleMenu } className = "dot-button">
                <span>&#9898;</span>
                <span>&#9898;</span>
                <span>&#9898;</span>
            </button>
            {
                showMenu
                ? <div className = "menu">
                    <button onClick = { unfriendUser }>Unfriend</button>
                </div>
                : null
            }
        </div>
    )
}

export default FriendDotMenu