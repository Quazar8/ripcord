import React, { useContext } from 'react'
import { FriendClientInfo } from '../../../../server/types/userTypes'
import { RightWindowContext } from '../RightWindow'

type Props = {
    friend: FriendClientInfo
}

const FriendPlate = ({ friend }: Props) => {
    let appendClass = friend.status === 'Online'
                        ? 'online' : 'offline'

    const { showChatDisplayFn } = useContext(RightWindowContext)

    const openChatWUser = () => {
        showChatDisplayFn(friend.id)
    }

    return (
        <div onClick = { openChatWUser } className = {"friend-plate" + ' ' + appendClass}>
            <h3>{ friend.username }</h3>
            {
                friend.status === 'Online'
                ? <div className = "status"></div>
                : null
            }
        </div>
    )
}

export default FriendPlate