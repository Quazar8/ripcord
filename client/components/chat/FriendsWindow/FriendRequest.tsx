import React from 'react'
import { PendingFriendInfo } from '../../../../server/types/UserTypes'

type Props = {
    candidate: PendingFriendInfo,
    type: 'INC' | 'OUT'
}

const FriendRequest = ({ candidate, type }: Props) => {
    let classAppend = type === 'INC' ? 'incoming' : 'outgoing'
    return (
        <div className = {"friend-request" + ' ' + classAppend}>
            <h3>{ candidate.username }</h3>
            <div className = "button-container">
                {
                    type === 'INC'
                    ? <button className = "approve">&#10004;</button>
                    : null
                }
                <button className = "cancel">&#10006;</button>
            </div>
        </div>
    )
}

export default FriendRequest