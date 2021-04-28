import { Request, Response } from "express";
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { IUserDoc, User } from '../../db/models/models.js'
import { UserInfo } from "./userTypes.js";
import { Document } from "mongoose";

export type FindFriendRes = ServerResponse<{
    found: UserInfo
}>

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
    
    let response: FindFriendRes = null
    if (isUserDoc(found)) {
        const userInfo: UserInfo = {
            id: found._id,
            username: found.username,
            registeredAt: found.registeredAt,
            friendsIds: found.friendsIds
        }

        response = successResponse({ found: userInfo }, '')
    } else {
        response = successResponse({ found: null }, 'No user found')
    }

    res.send(response)
}