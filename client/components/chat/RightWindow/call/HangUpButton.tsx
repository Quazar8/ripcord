import React from 'react'
import { WSDataType, WSMessage } from '../../../../../server/types/WebsocketTypes'

type Props = {
    removeCallInfoStore: () => void
    callerId: string
    recipientId: string
}

const HangUpButton = (props: Props) => {
    // const hangUpCall = () => {
    //     props.removeCallInfoStore()
    //     const msg: WSMessage<null> = {
    //         type: WSDataType.RECEIVING_CALL_DENIED,
    //     }
    // }

    return (
        <button onClick = { props.removeCallInfoStore } className = "hang-up-button">
            <span>&#128222;</span>
        </button>
    )
}

export default HangUpButton