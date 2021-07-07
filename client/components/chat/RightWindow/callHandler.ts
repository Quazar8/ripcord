import { MutableRefObject} from "react";
import { CallAnswerPayload, CallOfferPayload, WSDataType, WSMessage } from "../../../../server/types/WebsocketTypes";
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

const sendCallOffer = async (pc: RTCPeerConnection,
        recipientId: string, mediaConstraints: CallOfferPayload['mediaConstraints']) => {
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    
    const socketMsg: WSMessage<CallOfferPayload> = {
        type: WSDataType.CALL_OFFER,
        payload: {
            sdp: pc.localDescription,
            recipientId,
            mediaConstraints
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

const handleIncOfferMsg = async (msg: WSMessage<CallOfferPayload>,
    pc: RTCPeerConnection, ref: MutableRefObject<HTMLVideoElement>) => {
    createPeerConnection()
    const desc = new RTCSessionDescription(msg.payload.sdp)

    await pc.setRemoteDescription(desc)
    let localStream = await navigator.mediaDevices.getUserMedia(msg.payload.mediaConstraints)
        .catch(userMediaErrorHandler)
    if (!localStream) return 

    ref.current.srcObject = localStream
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream as MediaStream))
    
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    const socketMsg: WSMessage<CallAnswerPayload> = {
        type: WSDataType.CALL_ANSWER,
        payload: {
            sdp: pc.localDescription,
        }
    }
}

export const startCall = async (args: StartCallArgs) => {
    createPeerConnection()

    const mediaConstraints: CallOfferPayload['mediaConstraints'] = {
        audio: true,
        video: args.isVideoCall
    }

    let localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
    .catch(userMediaErrorHandler)
    if(!localStream) return

    args.ref.current.srcObject = localStream
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream as MediaStream))

    sendCallOffer(peerConnection, args.recipientId, mediaConstraints)
}