import React from 'react'
import { PendingFriendInfo } from '../../../../server/types/UserTypes'

type Props = {
    candidate: PendingFriendInfo,
    type: 'INC' | 'OUT'
}

const FriendRequest = ({ candidate }: Props) => {
    return (
        <div className = "friend-request">
            <h3>{ candidate.username }</h3>
        </div>
    )
}

export default FriendRequest