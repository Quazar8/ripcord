import React, { MutableRefObject } from 'react'
import ProfilePic from '../../../user/ProfilePic'
import HangUpButton from './HangUpButton'

type Props = {
    thisUserProfilePic: string
    remoteUserProfilePic: string
    hangUpCall: () => void
    localVideoRef: MutableRefObject<HTMLVideoElement>
    remoteVideoRef: MutableRefObject<HTMLVideoElement>
    isVideoCall: boolean
}

const CallWindow = (props: Props) => {
    return (
        <div className = "call-window">
            <div className = "profile-pics-container">
                <ProfilePic picNameOrJson = { props.thisUserProfilePic } />
                <ProfilePic picNameOrJson = { props.remoteUserProfilePic } />
                <video ref = { props.localVideoRef } />
                <video ref = { props.remoteVideoRef } />
            </div>
            <div className = "buttons-container">
                <HangUpButton 
                    hangUpCall = { props.hangUpCall }
                />
            </div>
        </div>
    )
}

export default CallWindow