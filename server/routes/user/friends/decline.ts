import { Response } from "express";
import { successResponse } from "../../../responses.js";
import { ReqWUser } from "../../../types/RequestTypes";

export const declineRequest = (req: ReqWUser, res: Response) => {
    res.send(successResponse({}, 'Req decline endpoint'))
}