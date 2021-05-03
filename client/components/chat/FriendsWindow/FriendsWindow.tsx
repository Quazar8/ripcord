import React from 'react'
import { pushNotification } from '../../../store/globalActions'

import AddFriend from './AddFriend'

type Props = {
    dispNotification: ReturnType<typeof pushNotification>
}

const FriendsWindow = (props: Props) => {
    return (
        <div className = "friends-window">
            <AddFriend 
                dispNotification = { props.dispNotification }
            />
        </div>
    )
}

export default FriendsWindow