import React, { useContext } from 'react'
import { DenyingCallPayload, WSDataType, WSMessage } from '../../../../../server/types/WebsocketTypes'
import { sendSocketMessage } from '../../../../socket/socket'
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

    const { callFns, userId } = useContext(RightWindowContext)

    const hangUpCall = () => {
        callFns.removeCallInfoStore()
        const msg: WSMessage<DenyingCallPayload> = {
            type: WSDataType.RECEIVING_CALL_DENIED,
            payload: {
                callerId: props.receivingCall.callerId,
                recipientId: userId
            }
        }

        sendSocketMessage(msg)
    }

    return (
        <div className = "receiving-call-block">
            <ProfilePic picNameOrJson = { props.receivingCall.callerProfilePic }/>
            <h3>{ props.receivingCall.callerName }</h3>
            <div className = "buttons-container">
                <AnswerCallButton />
                <HangUpButton hangUpCall = { hangUpCall }/>
            </div>
        </div>
    )
}

export default ReceivingCallBlock