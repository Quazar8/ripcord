import { Request, Response } from "express";
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { IUserDoc, User } from '../../db/models/models.js'
import { Document } from "mongoose"

export type AddFriendRes = ServerResponse<{
    found: boolean,
    sentRequest: boolean
}>

const isUserDoc = (doc: Document): doc is IUserDoc => {
    return doc?._id
}

export const addFriend = async (req: Request, res: Response) => {
    const { username } = req.query
    if (!username) {
        res.status(400).send(errorResponse('Bad request'))
        return
    }

    const found = await User.findOne({ username })
    
    let response: AddFriendRes = null
    if (isUserDoc(found)) {
        response = successResponse({ 
            found: true,
            sentRequest: false
        } , '')
    } else {
        response = successResponse({
            sentRequest: false,
            found: false
        }, 'No user found')
    }

    res.send(response)
}