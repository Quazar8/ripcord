import React, { useState } from 'react'
import { pushNotification } from '../../../store/globalActions'

import AddFriend from './AddFriend'
import FriendsMenuBar from './FriendsMenuBar'
import FriendsList from './FriendsList'

type Props = {
    dispNotification: ReturnType<typeof pushNotification>
}

export enum Subwindows {
    AddFriend,
    FriendsList
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

    const setAllPropsToFalse = (obj: typeof showSubwindow) => {
        for (let key in obj) {
            obj[key] = false
        }
    }

    const showCertainSubwindow = (name: Subwindows) => {
        const newState = { ...showSubwindow }
        setAllPropsToFalse(newState)
        
        switch (name) {
            case Subwindows.AddFriend:
                newState.addFriend = true; break;
            case Subwindows.FriendsList:
                newState.friendsList = true; break;
            default: break;
        }

        setShowSubWindow(newState)
    }

    return (
        <div className = "friends-window">
            <FriendsMenuBar 
                showCertainSubwindow = { showCertainSubwindow }
            />
            { SubWindow }
        </div>
    )
}

export default FriendsWindow