import React from 'react'
import { DenyingCallPayload, WSDataType, WSMessage } from '../../../../../server/types/WebsocketTypes'
import { sendSocketMessage } from '../../../../socket/socket'

type Props = {
    removeCallInfoStore: () => void
    callerId: string
    recipientId: string
}

const HangUpButton = (props: Props) => {
    const hangUpCall = () => {
        props.removeCallInfoStore()
        const msg: WSMessage<DenyingCallPayload> = {
            type: WSDataType.RECEIVING_CALL_DENIED,
            payload: {
                callerId: props.callerId,
                recipientId: props.recipientId
            }
        }

        sendSocketMessage(msg)
    }

    return (
        <button onClick = { hangUpCall } className = "hang-up-button">
            <span>&#128222;</span>
        </button>
    )
}

export default HangUpButton