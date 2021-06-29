import React, { useContext, useState, useEffect } from 'react'
import { FriendClientInfo, UserStatus } from '../../../../../server/types/UserTypes'
import ProfilePic from '../../../user/ProfilePic'
import { RightWindowContext } from '../RightWindow'
import FriendDotMenu from './FriendDotMenu'

type Props = {
    friend: FriendClientInfo
}

const FriendPlate = ({ friend }: Props) => {
    const [RightElement, setRightElement] = useState<JSX.Element>(null)
    let appendClass = friend.status === UserStatus.Online
                    ? 'online' : 'offline'

    const { toggleChatWRecipientId } = useContext(RightWindowContext)

    const openChatWUser = () => {
        toggleChatWRecipientId(friend.id)
    }

    const setDotMenu = () => {
        setRightElement(<FriendDotMenu friendId = { friend.id } />)
    }

    const StatusDiv = () => (
        <div className = "status"></div>
    )

    const removeDotMenu = () => {
        if (friend.status === UserStatus.Offline) {
            setRightElement(null)
            return
        }

        setRightElement(<StatusDiv />)
    }

    useEffect(() => {
        if (friend.status === UserStatus.Online) {
            setRightElement(<StatusDiv />)
        }
    }, [])

    return (
        <div onMouseEnter = { setDotMenu } onMouseLeave = { removeDotMenu } onClick = { openChatWUser } className = {"friend-plate" + ' ' + appendClass}>
            <div className="friend-info">
                <ProfilePic picNameOrJson = { friend.profilePic } />
                <h3>{ friend.username }</h3>
            </div>
            { RightElement }
        </div>
    )
}

export default FriendPlate