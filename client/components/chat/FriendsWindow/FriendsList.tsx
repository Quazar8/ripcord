import React, { useEffect, useState } from 'react'
import { FriendClientInfo } from '../../../../server/types/userTypes'
 
import { retrieveFriends } from '../../../api/userApi'
import { resHasError } from '../../../api/utils'

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

        console.log(res)
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
            Friends lsit component
        </div>
    )
}

export default FriendsList