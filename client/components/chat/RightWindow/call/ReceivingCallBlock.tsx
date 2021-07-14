import React, { useContext } from 'react'
import ProfilePic from '../../../user/ProfilePic'
import { ChatDisplayProps } from '../ChatDisplay'
import { RightWindowContext } from '../RightWindow'
import AnswerCallButton from './AnswerCallButton'
import { sendHangUpMsg } from './callHandler'
import HangUpButton from './HangUpButton'

type Props = {
    receivingCall: ChatDisplayProps['callState']['callInfo']
}

const ReceivingCallBlock = (props: Props) => {
    if (!props.receivingCall) return null

    const { callFns, userId } = useContext(RightWindowContext)

    const hangUpCall = () => {
        sendHangUpMsg(props.receivingCall.otherUserId, userId)
        callFns.removeCallInfoStore()
    }

    return (
        <div className = "receiving-call-block">
            <ProfilePic picNameOrJson = { props.receivingCall.otherUserProfilePic }/>
            <h3>{ props.receivingCall.otherUserName }</h3>
            <div className = "buttons-container">
                <AnswerCallButton />
                <HangUpButton hangUpCall = { hangUpCall }/>
            </div>
        </div>
    )
}

export default ReceivingCallBlock