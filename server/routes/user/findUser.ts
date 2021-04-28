import { Request, Response } from "express";
import { successResponse, errorResponse } from '../../responses.js'
import { IUserDoc, User } from '../../db/models/models.js'
import { UserInfo } from "./userTypes.js";
import { Document } from "mongoose";

const isUserDoc = (doc: Document): doc is IUserDoc => {
    return doc?._id
}

export const findFriend = async (req: Request, res: Response) => {
    const { username } = req.query
    if (!username) {
        res.status(400).send(errorResponse('Bad request'))
        return
    }

    const found = await User.findOne({ username })
    if (isUserDoc(found)) {
        const userInfo: UserInfo = {
            id: found._id,
            username: found.username,
            registeredAt: found.registeredAt,
            friendsIds: found.friendsIds
        }

        res.send(successResponse({ found: userInfo }, ''))
    } else {
        res.send(successResponse({}, 'No user found'))
    }
}