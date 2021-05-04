import { Response } from "express";
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { IUserDoc, User } from '../../db/models/models.js'
import { onlineUsers } from '../../websocket/wsServer.js'
import { Document, Types } from "mongoose"
import { ReqWUser } from '../../types/RequestTypes'
import { WSMessage, WSDataType } from '../../types/WebsocketTypes.js'
import { FriendClientInfo, PendingFriendInfo } from "../../types/UserTypes.js";

export type AddFriendRes = ServerResponse<{
    found: boolean,
    sentRequest: boolean
}>

export type OnlineFriendsRes = ServerResponse<FriendClientInfo[]>

export type PendingFriendsRes = ServerResponse<{
    incoming: PendingFriendInfo[],
    outgoing: PendingFriendInfo[]
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
        if (req.user.id.equals(found._id)) {
            response = errorResponse('You cannot add yourself')
        } else {
            response = await updateUser(req.user.id, found)
        }
    } else {
        response = successResponse({
            sentRequest: false,
            found: false
        }, 'No user found')
    }

    res.send(response)
}

export const pendingFriendRequests = async (req: ReqWUser, res: Response) => {
    let response: PendingFriendsRes = null
    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const incoming: PendingFriendInfo[] = []
    for (let id of req.user.incFriendRequests) {
        let user = await User.findById(id)
        if (isUserDoc(user)) {
            const info: PendingFriendInfo = {
                id: user._id,
                username: user.username,
                type: 'Incoming'
            }

            incoming.push(info)
        }
    }

    const outgoing: PendingFriendInfo[] = []
    for (let id of req.user.outFriendRequests) {
        let user = await User.findById(id)
        if (isUserDoc(user)) {
            const info: PendingFriendInfo = {
                id: user._id,
                username: user.username,
                type: 'Outgoing'
            }

            outgoing.push(info)
        }
    }
    
    response = successResponse({
        incoming,
        outgoing
    }, '')

    res.send(response)
}

export const onlineFriends = async (req: ReqWUser, res: Response) => {
    let response: OnlineFriendsRes = null
    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const friends = []
    for (let id of req.user.friendsIds) {
        const friend = await User.findById(id)
        if (isUserDoc(friend)) {
            const friendInfo: FriendClientInfo = {
                id: friend._id,
                username: friend.username
            }

            friends.push(friendInfo)
        }
    }

    response = successResponse(friends, '')

    res.send(response)
}