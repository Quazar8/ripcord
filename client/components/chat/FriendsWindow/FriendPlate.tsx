import React from 'react'
import { FriendClientInfo } from '../../../../server/types/userTypes'

type Props = {
    friend: FriendClientInfo
}

const FriendPlate = ({ friend }: Props) => {
    let appendClass = friend.status === 'Online'
                        ? 'online' : 'offline'
    return (
        <div className = {"friend-plate" + ' ' + appendClass}>
            <h3>{ friend.username }</h3>
            {
                friend.status === 'Online'
                ? <div className = "status"></div>
                : null
            }
        </div>
    )
}

export default FriendPlate