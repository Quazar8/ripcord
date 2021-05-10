import { Request, Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse } from '../../responses.js'

export const chatChannelInfoHandler = async (req: ReqWUser, res: Response) => {
    res.send(successResponse({}))
}