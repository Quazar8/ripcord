import { Request, Response } from "express";
import { successResponse } from '../../responses.js'

export const findFriend = (req: Request, res: Response) => {
    res.send(successResponse({ query: req.query }, 'find user endpoint'))
}