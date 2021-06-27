import React, { useContext } from 'react'
import { FriendClientInfo, UserStatus } from '../../../../../server/types/UserTypes'
import ProfilePic from '../../../user/ProfilePic'
import { RightWindowContext } from '../RightWindow'
import FriendDotMenu from './FriendDotMenu'

type Props = {
    friend: FriendClientInfo
}

const FriendPlate = ({ friend }: Props) => {
    let appendClass = friend.status === UserStatus.Online
                    ? 'online' : 'offline'

    const { toggleChatWRecipientId } = useContext(RightWindowContext)

    const openChatWUser = () => {
        toggleChatWRecipientId(friend.id)
    }

    return (
        <div onClick = { openChatWUser } className = {"friend-plate" + ' ' + appendClass}>
            <div className="friend-info">
                <ProfilePic picNameOrJson = { friend.profilePic } />
                <h3>{ friend.username }</h3>
            </div>
            {
                friend.status === 'Online'
                ? <div className = "status"></div>
                : null
            }
            <FriendDotMenu />
        </div>
    )
}

export default FriendPlate