import { MutableRefObject } from "react";
import { CallOfferPayload, WSDataType, WSMessage } from "../../../../server/types/WebsocketTypes";
import { sendSocketMessage } from "../../../socket/socket";

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

const sendCallOffer = async (pc: RTCPeerConnection, recipientId: string) => {
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    
    const socketMsg: WSMessage<CallOfferPayload> = {
        type: WSDataType.CALL_OFFER,
        payload: {
            sdp: pc.localDescription,
            recipientId
        }
    }

    sendSocketMessage(socketMsg)
}

const createPeerConnection = () => {
    if (peerConnection) {
        console.error('Already in a call')
        return
    }

    peerConnection = new RTCPeerConnection()
}

export const startCall = async (args: StartCallArgs) => {
    createPeerConnection()
    
    let localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: args.isVideoCall})
    .catch(userMediaErrorHandler)
    if(!localStream) return

    args.ref.current.srcObject = localStream
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream as MediaStream))

    sendCallOffer(peerConnection, args.recipientId)
}