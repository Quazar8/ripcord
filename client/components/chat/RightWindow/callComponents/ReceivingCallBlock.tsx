import React, { useContext } from 'react'
import ProfilePic from '../../../user/ProfilePic'
import { ChatDisplayProps } from '../ChatDisplay'
import { RightWindowContext } from '../RightWindow'
import AnswerCallButton from './AnswerCallButton'
import { RTCacceptCall, RTChangUpCall } from '../../../../call/callClientHandler'
import HangUpButton from './HangUpButton'

type Props = {
    receivingCall: ChatDisplayProps['callState']['receivingCallInfo']
}

const ReceivingCallBlock = (props: Props) => {
    if (!props.receivingCall) return null

    const { callFns, userId } = useContext(RightWindowContext)

    const hangUpCall = () => {
        RTChangUpCall(props.receivingCall.callerId, userId)
        callFns.removeReceivingCallInfo()
    }

    const answerCall = () => {
        RTCacceptCall(userId, props.receivingCall.callerId)
    }

    return (
        <div className = "receiving-call-block">
            <ProfilePic picNameOrJson = { props.receivingCall.callerProfilePic }/>
            <h3>{ props.receivingCall.callerName }</h3>
            <div className = "buttons-container">
                <AnswerCallButton answerCall = { answerCall } />
                <HangUpButton hangUpCall = { hangUpCall }/>
            </div>
        </div>
    )
}

export default ReceivingCallBlock