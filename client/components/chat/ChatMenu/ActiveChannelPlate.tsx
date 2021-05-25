import React, { MouseEvent, useContext } from 'react'
import { ActiveChannelInfo } from '../../../../server/types/ChatTypes'
import { removeActiveChannel } from '../../../api/chatApi'
import { resHasError } from '../../../api/utils'
import { ChatMenuContext } from '../ChatMenu'

type Props = {
    channel: ActiveChannelInfo
}

const ActiveChannelPlate = ({ channel }: Props) => {
    const context = useContext(ChatMenuContext)

    const handlePlateClick = () => {
        context.toggleChatWChannelId(channel.id)
    }

    const removeChannelFromActive = async (e: MouseEvent) => {
        e.stopPropagation()
        const res = await removeActiveChannel(channel.id)

        if (resHasError(res)) {
            return
        }

        console.log('channel removed')
    }

    return (
        <div onClick = { handlePlateClick } className = "active-channel-plate">
            <h4>{ channel.recipientUsername}</h4>
            <button onClick = { removeChannelFromActive }>&#x2716;</button>
        </div>
    )
}

export default ActiveChannelPlate