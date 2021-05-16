import React from 'react'
import { ActiveChannelInfo } from '../../../../server/types/ChatTypes'

type Props = {
    channel: ActiveChannelInfo
}

const ActiveChannelPlate = ({ channel }: Props) => {
    return (
        <div className = "active-channel-plate">
            <h4>{ channel.recipientUsername}</h4>
        </div>
    )
}

export default ActiveChannelPlate