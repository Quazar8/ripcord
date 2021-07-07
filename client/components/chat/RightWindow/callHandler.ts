import { MutableRefObject } from "react";

let peerConnection: RTCPeerConnection = null

type StartCallArgs = {
    ref: MutableRefObject<HTMLVideoElement>
    userId: string
    recipientId: string
    isVideoCall: boolean
}

export const startCall = async (args: StartCallArgs) => {
    if (peerConnection) {
        console.error('Already in a call')
        return
    }

    peerConnection = new RTCPeerConnection()
    let localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: args.isVideoCall})
    args.ref.current.srcObject = localStream
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream))
}