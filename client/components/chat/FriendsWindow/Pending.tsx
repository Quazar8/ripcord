import React, { useState, useEffect } from 'react'
import { PendingFriendInfo } from '../../../../server/types/UserTypes'

import { getFriendRequests } from '../../../api/userApi'
import { resHasError } from '../../../api/utils'

import FriendRequest from './FriendRequest'

type PendingState = {
    incoming: PendingFriendInfo[]
    outgoing: PendingFriendInfo[]
}

export const Pending = () => {
    const [pending, setPending] = useState<PendingState>({
        incoming: [],
        outgoing: []
    })

    const fetchRequests = async () => {
        const res = await getFriendRequests()
        if (resHasError(res)) {
            return
        }

        setPending(res.data)
    }

    useEffect(() => {
        fetchRequests()
    }, [])


    return (
        <div className = "pending-subwindow">
            <div>
                <span>Incoming:</span>
                {
                    pending.incoming.map((r, i) => (
                        <FriendRequest 
                            key = { i }
                            candidate = { r }
                            type = 'INC'
                        />
                    ))
                }
            </div>
            <div>
                <span>Outgoing:</span>
                {
                    pending.outgoing.map((r, i) => (
                        <FriendRequest 
                            key = { i }
                            candidate = { r }
                            type = 'OUT'
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Pending