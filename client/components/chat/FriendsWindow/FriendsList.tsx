import React, { useEffect, useState } from 'react'
import { FriendClientInfo } from '../../../../server/types/userTypes'
 
import { retrieveFriends } from '../../../api/userApi'
import { resHasError } from '../../../api/utils'

import FriendsPlate from './FriendPlate'

type Props = {
}

const FriendsList = (props: Props) => {
    const [friendsList, setFriendsList] = useState<{
        online: FriendClientInfo[],
        offline: FriendClientInfo[]
    }>({
        online: [],
        offline: []
    })

    const fetchFriends = async () => {
        const res = await retrieveFriends()

        if (resHasError(res)) {
            return
        }

        setFriendsList(res.data)
    }

    useEffect(() => {
        fetchFriends()
    }, [])

    if (friendsList.online.length === 0 && friendsList.offline.length === 0) {
        return (
            <div className = "friends-list">
                <h3>You don't have friends yet</h3>
            </div>
        )
    }

    return (
        <div className = "friends-list">
            {
                friendsList.online.length > 0
                ? <div>
                    <h2>Online:</h2>
                    {
                        friendsList.online.map((f, i) => (
                            <FriendsPlate
                                friend = { f }
                                key = { i }
                            />
                        ))
                    }
                </div>
                : null
            }
            {
                friendsList.offline.length > 0
                ? <div>
                    <h2>Offline:</h2>
                    {
                        friendsList.offline.map((f, i) => (
                            <FriendsPlate
                                friend = { f }
                                key = { i }
                            />
                        ))
                    }
                </div>
                : null
            }
        </div>
    )
}

export default FriendsList