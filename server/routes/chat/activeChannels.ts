import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { ActiveChannelInfo } from "../../types/ChatTypes";

export type GetActiveChannelsRes = ServerResponse<{
    activeChannels: ActiveChannelInfo[]
}>

export const getActiveChannels = async (req: ReqWUser, res: Response) => {
    
    res.send(successResponse({}))
}