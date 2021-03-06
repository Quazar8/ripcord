import React, { useEffect, useContext } from 'react'
 
import { retrieveFriends } from '../../../../api/userApi'
import { resHasError } from '../../../../api/utils'
import { RightWindowContext } from '../RightWindow'

import FriendsPlate from './FriendPlate'

const FriendsList = () => {
    const context = useContext(RightWindowContext)
    const friendsList = context.friendsList

    const fetchFriends = async () => {
        const res = await retrieveFriends()

        if (resHasError(res)) {
            return
        }

        context.fillFriendsListFn(res.data)
    }

    useEffect(() => {
        fetchFriends()
    }, [])

    if (friendsList.online.length === 0 && friendsList.offline.length === 0) {
        return (
            <div className = "friends-list">
                <h3 className = "no-friends-disclosure">You don't have friends yet</h3>
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