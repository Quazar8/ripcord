import React, { MouseEvent, useContext } from 'react'
import { removeActiveChannel } from '../../../api/chatApi'
import { resHasError } from '../../../api/utils'
import { ChatMenuContext } from '../ChatMenu'
import NotificationBubble from '../../others/notifications/NotifAttach'
import { ClientActiveChannel } from '../../../types/ChatClientTypes'

type Props = {
    channel: ClientActiveChannel
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

        context.removeChannelFromListFn(channel.id)
    }

    return (
        <div onClick = { handlePlateClick } className = "active-channel-plate">
            <h4>{ channel.recipientUsername}</h4>
            <button onClick = { removeChannelFromActive }>&#x2716;</button>
            <NotificationBubble
                amount = { channel.newMsgs }
            />
        </div>
    )
}

export default ActiveChannelPlate