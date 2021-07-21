import { Types } from "mongoose";
import { User } from "../../db/models/user.js";
import { isUserDoc } from "../../types/UserTypes.js";
import { CallAcceptedPayload, CallDeniedPayload, CallDetailsPayload, DenyingCallPayload, ReceivingCallPayload, StartCallPayload, WSDataType, WSMessage } from "../../types/WebsocketTypes.js";
import { isOnline, sendSocketMsg } from "../onlineUsers.js";

export const startCallHandler = async (msgPayload: StartCallPayload, userId: Types.ObjectId) => {
    try {
        if (!isOnline(msgPayload.recipientId)) {
            return
        }

        const caller = await User.findById(userId)

        if (!isUserDoc(caller)) {
            console.error('Couldn\'t get caller info when starting a call')
            return
        }

        const msgToReceiver: WSMessage<ReceivingCallPayload> = {
            type: WSDataType.RECEIVING_CALL,
            payload: {
                callerId: userId.toHexString(),
                callerName: caller.username,
                callerProfilePic: caller.profilePic
            }
        }

        sendSocketMsg(msgPayload.recipientId, msgToReceiver)
    }
    catch (err) {
        console.error('Error starting call', err)
    }
}

export const acceptedCallHandler = (msgPayload: CallAcceptedPayload, byUserId: Types.ObjectId) => {
    const msg: WSMessage<CallAcceptedPayload> = {
        type: WSDataType.CALL_ACCEPTED,
        payload: {
            acceptedId: byUserId.toHexString()
        }
    }

    sendSocketMsg(msgPayload.acceptedId, msg)
}

export const receivingCallDeniedHandler = (payload: DenyingCallPayload) => {
    const msg: WSMessage<CallDeniedPayload> = {
        type: WSDataType.CALL_DENIED,
        payload
    }
    sendSocketMsg(payload.callerId, msg)
}

export const startCallDetailsHandler = (msg: WSMessage<CallDetailsPayload>) => {
    sendSocketMsg(msg.payload.recipientId, msg)
}