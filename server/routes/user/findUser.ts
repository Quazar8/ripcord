import { Request, Response } from "express";
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { IUserDoc, User } from '../../db/models/models.js'
import { UserInfo } from "./UserTypes.js";
import { Document } from "mongoose";

type FoundFriendInfo = Pick<UserInfo, 'username' | 'id'>

export type FindFriendRes = ServerResponse<{
    found: FoundFriendInfo
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
        const userInfo: FoundFriendInfo = {
            id: found._id,
            username: found.username,
        }

        response = successResponse({ found: userInfo }, '')
    } else {
        response = successResponse({ found: null }, 'No user found')
    }

    res.send(response)
}