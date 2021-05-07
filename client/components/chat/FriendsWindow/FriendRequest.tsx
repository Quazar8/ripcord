import React, { useState } from 'react'
import { DeclineFriendRequestData } from '../../../../server/types/UserRequestData'
import { PendingFriendInfo } from '../../../../server/types/UserTypes'

import { cancelOrDeclineFrReq } from '../../../api/userApi'
import { resHasError } from '../../../api/utils'

type Props = {
    candidate: PendingFriendInfo,
    type: 'INC' | 'OUT'
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

    if (!show) return null

    return (
        <div className = {"friend-request" + ' ' + classAppend}>
            <h3>{ candidate.username }</h3>
            <div className = "button-container">
                {
                    type === 'INC'
                    ? <button className = "approve">&#10004;</button>
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