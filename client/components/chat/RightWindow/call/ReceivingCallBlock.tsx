import React, { useContext } from 'react'
import ProfilePic from '../../../user/ProfilePic'
import { ChatDisplayProps } from '../ChatDisplay'
import { RightWindowContext } from '../RightWindow'
import AnswerCallButton from './AnswerCallButton'
import HangUpButton from './HangUpButton'

type Props = {
    receivingCall: ChatDisplayProps['callState']['receivingCall']
}

const ReceivingCallBlock = (props: Props) => {
    if (!props.receivingCall) return null

    const { callFns } = useContext(RightWindowContext)

    return (
        <div className = "receiving-call-block">
            <ProfilePic picNameOrJson = { props.receivingCall.callerProfilePic }/>
            <h3>{ props.receivingCall.callerName }</h3>
            <div className = "buttons-container">
                <AnswerCallButton />
                <HangUpButton hangUpCallFn = { callFns.hangUpCall } />
            </div>
        </div>
    )
}

export default ReceivingCallBlock