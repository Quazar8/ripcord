import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse } from '../../responses.js'


export const getActiveChannels = (req: ReqWUser, res: Response) => {
    res.send(successResponse({}))
}