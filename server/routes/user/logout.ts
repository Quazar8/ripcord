import { Request, Response } from "express";
import { successResponse, errorResponse } from '../../responses'

export const logoutHandler = (req: Request, res: Response) => {
    res.send(successResponse({}, 'Log out endpoint'))
}