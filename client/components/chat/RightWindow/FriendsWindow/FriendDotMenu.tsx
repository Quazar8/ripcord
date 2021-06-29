import React, { MouseEvent, useState, useRef, FocusEvent, useEffect, useContext } from 'react'
import { requestUserUnfriend } from '../../../../api/userApi'
import { resHasError } from '../../../../api/utils'
import { RightWindowContext } from '../RightWindow'

type Props = {
    friendId: string
}

const FriendDotMenu = (props: Props) => {
    const context = useContext(RightWindowContext)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const divMenuRef = useRef<HTMLDivElement>()

    const unfriendUser = async (ev: MouseEvent) => {
        ev.stopPropagation()

        const res = await requestUserUnfriend(props.friendId)

        if (resHasError(res)) {
            console.log('Error unfriending user', res.errorMsg)
            return
        }

        context.removeFriendFromListFn(props.friendId)
        setShowMenu(false)
    }

    const toggleMenu = (ev: MouseEvent) => {
        ev.stopPropagation()
        setShowMenu(!showMenu)
    }

    const handleBlur = (ev: FocusEvent) => {
        if (!ev.currentTarget.contains(ev.relatedTarget as Element))
            setShowMenu(false)
    }

    useEffect(() => {
        if (divMenuRef.current)
            divMenuRef.current.focus()
    }, [showMenu])

    return (
        <div className = "friend-dot-menu-container">
            <button onClick = { toggleMenu } className = "dot-button">
                <span>&#9898;</span>
                <span>&#9898;</span>
                <span>&#9898;</span>
            </button>
            {
                showMenu
                ? <div tabIndex = { 0 } ref = { divMenuRef } onBlur = { handleBlur } className = "menu">
                    <button onClick = { unfriendUser }>Unfriend</button>
                </div>
                : null
            }
        </div>
    )
}

export default FriendDotMenu