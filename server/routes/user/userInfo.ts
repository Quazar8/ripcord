import { Request, Response } from "express";
import { successResponse } from "../../responses.js";

export const userInfoFromToken = (req: Request, res: Response) => {
    res.status(200).send(successResponse({}, 'User Info from token reached'))
}