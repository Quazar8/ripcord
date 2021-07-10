import { Types } from "mongoose";
import { StartCallPayload } from "../../types/WebsocketTypes";
import { isOnline } from "../onlineUsers.js";

export const startCallHandler = (msgPayload: StartCallPayload, userId: Types.ObjectId) => {
    try {
        console.log(msgPayload)
    }
    catch (err) {
        console.error('Error starting call', err)
    }
}