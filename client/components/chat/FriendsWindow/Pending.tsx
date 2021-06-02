import React, { useEffect, useContext } from 'react'

import { getFriendRequests } from '../../../api/userApi'
import { resHasError } from '../../../api/utils'
import { RightWindowContext } from '../RightWindow'

import FriendRequest from './FriendRequest'

export const Pending = () => {
    const context = useContext(RightWindowContext)
    const pending = context.friendRequests
    
    const fetchRequests = async () => {
        const res = await getFriendRequests()
        if (resHasError(res)) {
            return
        }

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