import React, { MouseEvent, useState, useRef } from 'react'
import { requestUserUnfriend } from '../../../../api/userApi'
import { resHasError } from '../../../../api/utils'

type Props = {
    friendId: string
}

const FriendDotMenu = (props: Props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const divMenuRef = useRef<HTMLDivElement>()

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
        if (showMenu) divMenuRef.current.focus()
    }

    const hideMenu = () => {
        setShowMenu(false)
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
                ? <div tabIndex = {1} onBlur = { hideMenu } className = "menu">
                    <button onClick = { unfriendUser }>Unfriend</button>
                </div>
                : null
            }
        </div>
    )
}

export default FriendDotMenu