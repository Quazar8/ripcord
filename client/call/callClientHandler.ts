import { CallAcceptedPayload, CallAnswerDetailsPayload, CallDetailsPayload,
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
            closeCallDetails()
            break;
        }
        case 'failed': {
            console.log('RTC ICE connection state failed')
            closeCallDetails()
            break;
        }
        default: break;
    }
}

const isInACall = (): boolean => {
    return typeof remoteUserId === 'string'
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

export const handleIncAnswerCallDetails = (payload: CallAnswerDetailsPayload) => {
    peerConnection.setRemoteDescription(payload.sdp).catch(err => {
        console.log('handling inc call answer details error', err)
    })
}

const sendAnswerDetails = (otherUserId: string, sdp: CallAnswerDetailsPayload['sdp']) => {
    const msg: WSMessage<CallAnswerDetailsPayload> = {
        type: WSDataType.CALL_ANSWER_DETAILS,
        payload: {
            sdp,
            callerId: otherUserId
        }
    }

    sendSocketMessage(msg)
}

export const handleIncCallDetailsMsg = async (msg: WSMessage<CallDetailsPayload>) => {
    createPeerConnection(msg.payload.recipientId, remoteVidEl)
    const desc = new RTCSessionDescription(msg.payload.sdp)

    await peerConnection.setRemoteDescription(desc)
    let localStream = await navigator.mediaDevices.getUserMedia(msg.payload.mediaConstraints)
        .catch(userMediaErrorHandler)
    if (!localStream) return 

    remoteVidEl.srcObject = localStream
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream as MediaStream))
    
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    sendAnswerDetails(remoteUserId, peerConnection.localDescription)
}

const sendCallDetails = (sdp: CallDetailsPayload['sdp'],
        recipientId: string, mediaConstraints: CallDetailsPayload['mediaConstraints']) => {
    
    const socketMsg: WSMessage<CallDetailsPayload> = {
        type: WSDataType.CALL_DETAILS,
        payload: {
            sdp,
            recipientId,
            mediaConstraints
        }
    }

    sendSocketMessage(socketMsg)
}


export const RTCsetupAndCallOffer = async (msgPayload: CallAcceptedPayload) => {
    createPeerConnection(remoteUserId, remoteVidEl)

    const mediaConstraints: CallDetailsPayload['mediaConstraints'] = {
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

    sendCallDetails(peerConnection.localDescription, msgPayload.acceptedId, mediaConstraints)
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

const closeCallDetails = () => {
    if (peerConnection) {
        peerConnection.onicecandidate = null 
        peerConnection.ontrack = null
        peerConnection.oniceconnectionstatechange = null

        remoteUserId = null
        localUserId = null

        if (localVidEl && localVidEl.srcObject) {
            (localVidEl.srcObject as MediaStream).getTracks().forEach(t => t.stop())
        }

        if (remoteVidEl && remoteVidEl.srcObject) {
            (remoteVidEl.srcObject as MediaStream).getTracks().forEach(t => t.stop())
        }

        localVidEl = null
        remoteVidEl = null
        callButtonEl = null

        peerConnection.close()
        peerConnection = null
    }
}

export const RTChangUpCall = (remoteUserId: string, localUserId: string) => {
    sendHangUpMsg(remoteUserId, localUserId)
    closeCallDetails()
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