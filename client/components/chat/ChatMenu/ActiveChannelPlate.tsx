import React, { useContext } from 'react'
import { ActiveChannelInfo } from '../../../../server/types/ChatTypes'
import { ChatMenuContext } from '../ChatMenu'

type Props = {
    channel: ActiveChannelInfo
}

const ActiveChannelPlate = ({ channel }: Props) => {
    const context = useContext(ChatMenuContext)

    const handlePlateClick = () => {
        context.toggleChatWChannelId(channel.id)
    }
    return (
        <div onClick = { handlePlateClick } className = "active-channel-plate">
            <h4>{ channel.recipientUsername}</h4>
            <button>&#x2716;</button>
        </div>
    )
}

export default ActiveChannelPlate