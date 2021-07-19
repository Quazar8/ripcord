import { CallAcceptedPayload, CallAnswerPayload, CallOfferPayload,
         DenyingCallPayload, HangUpCallPayload,
         NewICECandPayload, StartCallPayload,
         WSDataType, WSMessage } from "../../server/types/WebsocketTypes";
import { sendSocketMessage } from "../socket/socket";

let peerConnection: RTCPeerConnection = null
let localVidEl: HTMLVideoElement = null
let remoteVidEl: HTMLVideoElement = null
let callButtonEl: HTMLButtonElement = null
let remoteUserId: string = null
let localUserId: string = null

type StartCallArgs = {
    thisVideoEl: HTMLVideoElement
    otherVideoEl: HTMLVideoElement
    callButtonEl: HTMLButtonElement
    thisUserId: string
    otherUserId: string
    isVideoCall: boolean
}

type IncCallArgs = {
    thisVideoEl: HTMLVideoElement
    otherVideoEl: HTMLVideoElement
    thisUserId: string
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

const createPeerConnection = (recipientId: string, otherVideoEl: HTMLVideoElement) => {
    if (peerConnection) {
        console.error('Already in a call')
        return
    }

    peerConnection = new RTCPeerConnection()

    peerConnection.onicecandidate = (ev) => handleIceCandidateEv(ev, recipientId) 
    peerConnection.ontrack = (ev) => handleTrackEv(ev, otherVideoEl)
    peerConnection.oniceconnectionstatechange = handleIceStateEv
}

const handleIceStateEv = () => {
    switch(peerConnection.iceConnectionState) {
        case 'closed': {
            console.log('RTC ICE connection closed')
            closeCall()
            break;
        }
        case 'failed': {
            console.log('RTC ICE connection state failed')
            closeCall()
            break;
        }
        default: break;
    }
}

const isInACall = (): boolean => {
    return typeof remoteUserId === 'string'
}

const closeCall = () => {
    if (peerConnection) {
        peerConnection.ontrack = null
        peerConnection.onicecandidate = null
        peerConnection.oniceconnectionstatechange = null
    }

    if (remoteVidEl.srcObject) {
        (remoteVidEl.srcObject as MediaStream).getTracks().forEach(track => track.stop())
    }

    if (localVidEl.srcObject) {
        (localVidEl.srcObject as MediaStream).getTracks().forEach(track => track.stop())
    }

    peerConnection.close()
    peerConnection = null
}

const handleTrackEv = (ev: RTCTrackEvent, otherVideoEl: HTMLVideoElement) => {
    otherVideoEl.srcObject = ev.streams[0]
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
    pc: RTCPeerConnection, args: IncCallArgs) => {
    createPeerConnection(msg.payload.recipientId, args.otherVideoEl)
    const desc = new RTCSessionDescription(msg.payload.sdp)

    await pc.setRemoteDescription(desc)
    let localStream = await navigator.mediaDevices.getUserMedia(msg.payload.mediaConstraints)
        .catch(userMediaErrorHandler)
    if (!localStream) return 

    args.thisVideoEl.srcObject = localStream
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

const sendCallOffer = async (pc: RTCPeerConnection,
        recipientId: string, mediaConstraints: CallOfferPayload['mediaConstraints']) => {
    
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


export const RTCsetupAndCallOffer = async (msgPayload: CallAcceptedPayload) => {
    createPeerConnection(remoteUserId, remoteVidEl)

    const mediaConstraints: CallOfferPayload['mediaConstraints'] = {
        audio: true,
        video: false
    }

    let localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
    .catch(userMediaErrorHandler)
    if(!localStream) return

    localVidEl.srcObject = localStream
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream as MediaStream))

    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    // sendCallOffer(peerConnection, args.otherUserId, mediaConstraints)
}

export const startCall = (args: StartCallArgs) => {
    callButtonEl = args.callButtonEl
    remoteVidEl = args.otherVideoEl
    localVidEl = args.thisVideoEl
    remoteUserId = args.otherUserId
    localUserId = args.thisUserId

    callButtonEl.disabled = true

    const msg: WSMessage<StartCallPayload> = {
        type: WSDataType.START_CALL,
        payload: {
            recipientId: remoteUserId
        }
    }

    sendSocketMessage(msg)
}

const sendHangUpMsg = (remoteUserId: string, localUserId: string) => {
    const msg: WSMessage<DenyingCallPayload> = {
        type: WSDataType.RECEIVING_CALL_DENIED,
        payload: {
            callerId: remoteUserId,
            recipientId: localUserId
        }
    }

    sendSocketMessage(msg)
}

const sendCallAcceptedMsg = (remoteUserId: string) => {
    const msg: WSMessage<CallAcceptedPayload> = {
        type: WSDataType.CALL_ACCEPTED,
        payload: {
            acceptedId: remoteUserId
        }
    }

    sendSocketMessage(msg)
}

export const RTChangUpCall = (remoteUserId: string, localUserId: string) => {
    sendHangUpMsg(remoteUserId, localUserId)
}

export const RTCacceptCall = (thisUserId: string, otherUserId: string) => {
    if (isInACall()) {
        console.log('Already in a call')
        return
    }

    remoteUserId = otherUserId
    localUserId = thisUserId
    sendCallAcceptedMsg(remoteUserId)
}