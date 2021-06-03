import React, { useState } from 'react'
import { DeclineFriendRequestData, AcceptFriendRequestData } from '../../../../server/types/UserRequestData'
import { PendingFriendInfo } from '../../../../server/types/UserTypes'

import { cancelOrDeclineFrReq, acceptFriendRequest } from '../../../api/userApi'
import { resHasError } from '../../../api/utils'

type Props = {
    candidate: PendingFriendInfo
    type: 'INC' | 'OUT'
    index: number
}

const FriendRequest = ({ candidate, type }: Props) => {
    let classAppend = type === 'INC' ? 'incoming' : 'outgoing'

    let [show, setShow] = useState(true)

    const declineOrCancel = async () => {
        let data: DeclineFriendRequestData = {
            declineInc: type === 'INC',
            declinedId: candidate.id
        }

        console.log(data)

        const res = await cancelOrDeclineFrReq(data)

        if (resHasError(res)) {
            console.error(res.errorMsg)
        } else {
            setShow(false)
        }
    }

    const approveRequest = async () => {
        if (type === 'OUT') return

        let data: AcceptFriendRequestData = {
            acceptedId: candidate.id
        }

        const res = await acceptFriendRequest(data)

        if (resHasError(res)) {
            console.error(res.errorMsg)
        } else {
            setShow(false)
        }
    }

    if (!show) return null

    return (
        <div className = {"friend-request" + ' ' + classAppend}>
            <h3>{ candidate.username }</h3>
            <div className = "button-container">
                {
                    type === 'INC'
                    ? <button onClick = { approveRequest } className = "approve">&#10004;</button>
                    : null
                }
                <button 
                    className = "cancel"
                    onClick = { declineOrCancel }
                >
                        &#10006;
                </button>
            </div>
        </div>
    )
}

export default FriendRequest