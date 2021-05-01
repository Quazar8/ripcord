import { Response } from "express";
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { IUserDoc, User } from '../../db/models/models.js'
import { onlineUsers } from '../../websocket/wsServer.js'
import { Document, Types } from "mongoose"
import { ReqWUser } from '../../types/RequestTypes'
import { WSMessage, WSDataType } from '../../types/WebsocketTypes'

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
    
    let updateUser = async (requesterId: Types.ObjectId, foundFriend: IUserDoc): Promise<AddFriendRes> => {
        let resp: AddFriendRes = null
        foundFriend.incFriendRequests.push(requesterId)

        try {
            await foundFriend.save()
            const socket = onlineUsers[foundFriend.id]
            
            if (socket) {
                const msg: WSMessage<null> = {
                    type: WSDataType.FRIEND_REQUEST,
                    payload: null
                }

                socket.send(JSON.stringify(msg))
            }

            resp = successResponse({
                found: true,
                sentRequest: true
            }, '')
        }
        catch {
            resp = errorResponse('Something went wrong')
        }        

        return resp
    }

    let response: AddFriendRes = null
    if (isUserDoc(found)) {
        response = await updateUser(req.user.id, found)
    } else {
        response = successResponse({
            sentRequest: false,
            found: false
        }, 'No user found')
    }

    res.send(response)
}