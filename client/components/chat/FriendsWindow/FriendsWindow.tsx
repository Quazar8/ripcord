import React, { useState } from 'react'
import { pushNotification } from '../../../store/globalActions'

import AddFriend from './AddFriend'
import FriendsMenuBar from './FriendsMenuBar'
import FriendsList from './FriendsList'

type Props = {
    dispNotification: ReturnType<typeof pushNotification>
}

const FriendsWindow = (props: Props) => {
    const [showSubwindow, setShowSubWindow] = useState({
        addFriend: false,
        friendsList: true
    })

    let SubWindow = null

    switch (true) {
        case showSubwindow.addFriend:
            SubWindow = <AddFriend
                dispNotification = { props.dispNotification }
            />
            break;
        case showSubwindow.friendsList:
            SubWindow = <FriendsList /> 
            break;
        default: SubWindow = null
    }


    return (
        <div className = "friends-window">
            <FriendsMenuBar />
            { SubWindow }
        </div>
    )
}

export default FriendsWindow