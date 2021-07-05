import React, { MouseEvent, useContext } from 'react'
import { removeActiveChannel } from '../../../api/chatApi'
import { resHasError } from '../../../api/utils'
import { ChatMenuContext } from './ChatMenu'
import NotificationBubble from '../../others/notifications/NotifAttach'
import { ClientActiveChannel } from '../../../types/ChatClientTypes'
import ProfilePic from '../../user/ProfilePic'

type Props = {
    channel: ClientActiveChannel
}

const ActiveChannelPlate = ({ channel }: Props) => {
    const context = useContext(ChatMenuContext)

    const handlePlateClick = () => {
        context.toggleChatWChannelId(channel.id)
        context.clearActiveChannelNotifFn(channel.id)
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
            <div className = "recipient-info">
                <ProfilePic picNameOrJson = { channel.recipientPic } 
                    onlineStatus = { channel.recipientStatus }
                />
                <h4>{ channel.recipientUsername}</h4>
            </div>
            <button onClick = { removeChannelFromActive }>&#x2716;</button>
            <NotificationBubble
                amount = { channel.newMessages }
            />
        </div>
    )
}

export default ActiveChannelPlate