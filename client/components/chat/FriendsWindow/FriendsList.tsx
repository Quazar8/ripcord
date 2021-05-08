import React, { useEffect, useState } from 'react'
import { FriendClientInfo } from '../../../../server/types/userTypes'
 
import { retrieveFriends } from '../../../api/userApi'
import { resHasError } from '../../../api/utils'

import FriendsPlate from './FriendPlate'

const FriendsList = () => {
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


    return (
        <div className = "friends-list">
            <div>
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
            <div>
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
        </div>
    )
}

export default FriendsList