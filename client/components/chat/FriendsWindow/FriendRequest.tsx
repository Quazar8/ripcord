import React from 'react'
import { PendingFriendInfo } from '../../../../server/types/UserTypes'

type Props = {
    candidate: PendingFriendInfo,
    type: 'INC' | 'OUT'
}

const FriendRequest = ({ candidate, type }: Props) => {
    return (
        <div className = "friend-request">
            <h3>{ candidate.username }</h3>
            <div className = "button-container">
                {
                    type === 'INC'
                    ? <button>&#10004;</button>
                    : null
                }
                <button>&#10006;</button>
            </div>
        </div>
    )
}

export default FriendRequest