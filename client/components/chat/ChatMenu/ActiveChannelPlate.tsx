import React, { useContext } from 'react'
import { ActiveChannelInfo } from '../../../../server/types/ChatTypes'
import { ChatMenuContext } from '../ChatMenu'

type Props = {
    channel: ActiveChannelInfo
}

const ActiveChannelPlate = ({ channel }: Props) => {
    const context = useContext(ChatMenuContext)

    const handlePlateClick = () => {
        context.changeChannelIdFn(channel.id)
    }
    return (
        <div onClick = { handlePlateClick } className = "active-channel-plate">
            <h4>{ channel.recipientUsername}</h4>
        </div>
    )
}

export default ActiveChannelPlate