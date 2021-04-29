import { Response } from "express";
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { IUserDoc, User } from '../../db/models/models.js'
import { } from '../user/UserTypes'
import { onlineUsers } from '../../websocket/wsServer.js'
import { Document } from "mongoose"
import { ReqWUser } from '../../types/RequestTypes'

export type AddFriendRes = ServerResponse<{
    found: boolean,
    sentRequest: boolean
}>

const isUserDoc = (doc: Document): doc is IUserDoc => {
    return doc?._id
}

export const addFriend = async (req: ReqWUser, res: Response) => {
    const { username } = req.query
    if (!username) {
        res.status(400).send(errorResponse('Bad request'))
        return
    }

    const found = await User.findOne({ username })
    
    let response: AddFriendRes = null
    if (isUserDoc(found)) {
        found.incFriendRequests.push(req.user.id)

        try {
            const updated = await found.save()
            response = successResponse({ 
                found: true,
                sentRequest: false
            }, '')
        } 
        catch {
            response = errorResponse('Something went wrong')
        }
    } else {
        response = successResponse({
            sentRequest: false,
            found: false
        }, 'No user found')
    }

    res.send(response)
}