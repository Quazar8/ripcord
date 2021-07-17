import React, { MutableRefObject } from 'react'
import ProfilePic from '../../../user/ProfilePic'
import HangUpButton from './HangUpButton'

type Props = {
    thisUserProfilePic: string
    remoteUserProfilePic: string
    hangUpCall: () => void
    localVideoRef: MutableRefObject<HTMLVideoElement>
    otherVideoRef: MutableRefObject<HTMLVideoElement>
    isVideoCall: boolean
}

const CallWindow = (props: Props) => {
    const getMainContainer = () => {
        if (props.isVideoCall) {
            return <h3>Not implemented yet</h3>
        }

        return (
            <div className = "profile-pics-container">
                <ProfilePic picNameOrJson = { props.thisUserProfilePic } />
                <video ref = { props.localVideoRef } />
                <ProfilePic picNameOrJson = { props.remoteUserProfilePic } />
                <video ref = { props.localVideoRef } />
            </div>
        )
    }

    return (
        <div className = "call-window">
            {
                getMainContainer()
            }
            <div className = "buttons-container">
                <HangUpButton 
                    hangUpCall = { props.hangUpCall }
                />
            </div>
        </div>
    )
}

export default CallWindow