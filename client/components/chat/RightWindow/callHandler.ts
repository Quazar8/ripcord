import { CallAnswerPayload, CallOfferPayload, NewICECandPayload, WSDataType, WSMessage } from "../../../../server/types/WebsocketTypes";
import { sendSocketMessage } from "../../../socket/socket";

let peerConnection: RTCPeerConnection = null

type StartCallArgs = {
    thisVideoEl: HTMLVideoElement
    otherVideoEl: HTMLVideoElement
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

const createPeerConnection = (recipientId: string) => {
    if (peerConnection) {
        console.error('Already in a call')
        return
    }

    peerConnection = new RTCPeerConnection()

    peerConnection.onicecandidate = (ev) => handleIceCandidateEv(ev, recipientId) 
}

const handleIceCandidateEv = (ev: RTCPeerConnectionIceEvent, recipientId: string) => {
    if (ev.candidate) {
        const msg: WSMessage<NewICECandPayload> = {
            type: WSDataType.NEW_ICE_CAND,
            payload: {
                recipientId,
                candidate: ev.candidate
            }
        }

        sendSocketMessage(msg)
    }
}

export const handleNewIceCandidateMsg = (msg: WSMessage<NewICECandPayload>) => {
    const cand = new RTCIceCandidate(msg.payload.candidate)

    peerConnection.addIceCandidate(cand).catch(err => {
        console.log('Handling ice candidate message error', err)
    })
}

export const handleIncOfferMsg = async (msg: WSMessage<CallOfferPayload>,
    pc: RTCPeerConnection, thisVideoEl: HTMLVideoElement) => {
    createPeerConnection(msg.payload.recipientId)
    const desc = new RTCSessionDescription(msg.payload.sdp)

    await pc.setRemoteDescription(desc)
    let localStream = await navigator.mediaDevices.getUserMedia(msg.payload.mediaConstraints)
        .catch(userMediaErrorHandler)
    if (!localStream) return 

    thisVideoEl.srcObject = localStream
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream as MediaStream))
    
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    const socketMsg: WSMessage<CallAnswerPayload> = {
        type: WSDataType.CALL_ANSWER,
        payload: {
            sdp: pc.localDescription,
        }
    }

    sendSocketMessage(socketMsg)
}

export const startCall = async (args: StartCallArgs) => {
    createPeerConnection(args.recipientId)

    const mediaConstraints: CallOfferPayload['mediaConstraints'] = {
        audio: true,
        video: args.isVideoCall
    }

    let localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
    .catch(userMediaErrorHandler)
    if(!localStream) return

    args.thisVideoEl.srcObject = localStream
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream as MediaStream))

    sendCallOffer(peerConnection, args.recipientId, mediaConstraints)
}