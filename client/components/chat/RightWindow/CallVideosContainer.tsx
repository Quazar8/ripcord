import React, { MutableRefObject } from 'react'

type Props = {
    localVideoRef: MutableRefObject<HTMLVideoElement>
    remoteVideoRef: MutableRefObject<HTMLVideoElement>
}

const CallVideosContainer = (props: Props) => {
    return (
        <div className = "call-videos-container">
            <video ref = { props.localVideoRef } id = "local"></video>
            <video ref = { props.remoteVideoRef } id = "remote"></video>
        </div>
    )
}

export default CallVideosContainer