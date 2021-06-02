import React, { useState, useEffect, useContext } from 'react'
import { PendingFriendInfo } from '../../../../server/types/UserTypes'

import { getFriendRequests } from '../../../api/userApi'
import { resHasError } from '../../../api/utils'
import { RightWindowContext } from '../RightWindow'

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

    const context = useContext(RightWindowContext)

    const fetchRequests = async () => {
        const res = await getFriendRequests()
        if (resHasError(res)) {
            return
        }

        setPending(res.data)
        context.fillFriendRequestsFn(res.data)
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    if (pending.incoming.length === 0 && pending.outgoing.length === 0) {
        return (
            <div className = "pending-subwindow">
                <h2>No pending friend requests</h2>
            </div>
        )
    }

    return (
        <div className = "pending-subwindow">
            <div className = "subsection">
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
            <div className = "subsection">
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