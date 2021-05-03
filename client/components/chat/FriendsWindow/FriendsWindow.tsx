import React from 'react'
import { pushNotification } from '../../../store/globalActions'

import AddFriend from './AddFriend'
import FriendsMenuBar from './FriendsMenuBar'
import FriendsList from './FriendsList'

type Props = {
    dispNotification: ReturnType<typeof pushNotification>
}

const FriendsWindow = (props: Props) => {
    return (
        <div className = "friends-window">
            <FriendsMenuBar />
            <AddFriend 
                dispNotification = { props.dispNotification }
            />
            <FriendsList />
        </div>
    )
}

export default FriendsWindow