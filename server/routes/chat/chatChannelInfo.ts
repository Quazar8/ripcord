import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse } from '../../responses.js'
import { RecipientInfo, Message } from '../../types/ChatTypes'

export type ChatChannelRes = {
    recipient: RecipientInfo,
    messages: Message[]
}

export const chatChannelInfoHandler = async (req: ReqWUser, res: Response) => {
    if (!req.user)
    res.send(successResponse({}))
}