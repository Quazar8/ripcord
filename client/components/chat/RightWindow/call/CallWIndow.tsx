import React from 'react'
import ProfilePic from '../../../user/ProfilePic'
import HangUpButton from './HangUpButton'

type Props = {
    thisUserProfilePic: string
    remoteUserProfilePic: string
    hangUpCall: () => void
}

const CallWIndow = (props: Props) => {
    return (
        <div className = "call-window">
            <div className = "profile-pics-container">
                <ProfilePic picNameOrJson = { props.thisUserProfilePic } />
                <ProfilePic picNameOrJson = { props.remoteUserProfilePic } />
            </div>
            <div className = "buttons-container">
                <HangUpButton 
                    hangUpCall = { props.hangUpCall }
                />
            </div>
        </div>
    )
}

export default CallWIndow