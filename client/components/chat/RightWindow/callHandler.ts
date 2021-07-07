import { MutableRefObject } from "react";

let peerConnection: RTCPeerConnection = null

type StartCallArgs = {
    ref: MutableRefObject<HTMLVideoElement>
    userId: string
    recipientId: string
    isVideoCall: boolean
}

const userMediaErrorHandler = (e: Error) => {
    switch (e.name) {
        case "NotFoundError": {
            console.log('No mic or camera being found')
            break;
        }
        case "SecurityError":
        case "PermissDeniedError": break;
        default: console.log('Unable to open the camera/mic ' + e.message)
    }
}

export const startCall = async (args: StartCallArgs) => {
    if (peerConnection) {
        console.error('Already in a call')
        return
    }

    peerConnection = new RTCPeerConnection()
    let localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: args.isVideoCall})
    .catch(userMediaErrorHandler)
    if(!localStream) return

    args.ref.current.srcObject = localStream
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream as MediaStream))
}