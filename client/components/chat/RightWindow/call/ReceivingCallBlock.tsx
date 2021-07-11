import React from 'react'
import ProfilePic from '../../../user/ProfilePic'
import { ChatDisplayProps } from '../ChatDisplay'
import ReceiveCallButton from './AcceptCallButton'
import HangUpButton from './HangUpButton'

type Props = {
    receivingCall: ChatDisplayProps['callState']['receivingCall']
}

const ReceivingCallBlock = (props: Props) => {
    if (!props.receivingCall) return null

    return (
        <div className = "receiving-call-block">
            <ProfilePic picNameOrJson = { props.receivingCall.callerProfilePic }/>
            <h3>{ props.receivingCall.callerName }</h3>
            <div className = "buttons-container">
                <ReceiveCallButton />
                <HangUpButton />
            </div>
        </div>
    )
}

export default ReceivingCallBlock