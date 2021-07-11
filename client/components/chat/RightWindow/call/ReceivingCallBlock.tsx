import React from 'react'
import { ChatDisplayProps } from '../ChatDisplay'

type Props = {
    receivingCall: ChatDisplayProps['callState']['receivingCall']
}

const ReceivingCallBlock = (props: Props) => {
    return (
        <div className = "receiving-call-block">
            Receiving call component
        </div>
    )
}

export default ReceivingCallBlock