import { Response } from "express";
import { successResponse, errorResponse, ServerResponse } from '../../../responses.js'
import { IUserDoc, User } from '../../../db/models/user.js'
import { onlineUsers, sendSocketMsg } from '../../../websocket/onlineUsers.js'
import { ReqWUser } from '../../../types/RequestTypes'
import { WSMessage, WSDataType } from '../../../types/WebsocketTypes.js'
import { FriendClientInfo, PendingFriendInfo, isUserDoc, UserStatus } from "../../../types/UserTypes.js";

export type AddFriendRes = ServerResponse<{
    found: boolean,
    sentRequest: boolean
}>

export type PendingFriendsRes = ServerResponse<{
    incoming: PendingFriendInfo[],
    outgoing: PendingFriendInfo[]
}>

export type GetFriendsRes = ServerResponse<{
    online: FriendClientInfo[],
    offline: FriendClientInfo[]
}>

export const addFriend = async (req: ReqWUser, res: Response) => {
    let response: AddFriendRes = null
    let status: number = 200

    const { username } = req.query
    if (!username) {
        response = errorResponse('Bad request')
        res.status(400).send(response)
        return
    }

    try {
        const found = await User.findOne({ username })
        const issuer = await User.findById(req.user.id)

        let updateUser = async (requester: IUserDoc, foundFriend: IUserDoc): Promise<AddFriendRes> => {
            let resp: AddFriendRes = null
            foundFriend.incFriendRequests.push(requester._id)
            requester.outFriendRequests.push(foundFriend._id)

            await foundFriend.save()
            await requester.save()

            const msg: WSMessage<null> = {
                type: WSDataType.FRIEND_REQUEST,
                payload: null
            }

            sendSocketMsg(foundFriend._id, msg)

            resp = successResponse({
                found: true,
                sentRequest: true
            }, '')

            return resp
        }

        if (isUserDoc(found) && isUserDoc(issuer)) {
            if (issuer._id.equals(found._id)) {
                response = errorResponse('You cannot add yourself')
                status = 400
            } else {
                response = await updateUser(issuer, found)
            }
        } else {
            response = successResponse({
                sentRequest: false,
                found: false
            }, 'No user found')
        }
    }
    catch (err) {
        response = errorResponse('Something went wrong')
        console.error(err)
        status = 500
    }

    res.status(status).send(response)
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

export const getFriends = async (req: ReqWUser, res: Response) => {
    let response: GetFriendsRes = null
    let status: number = 200

    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    try {
        const online = []
        const offline = []

        for (let id of req.user.friendsIds) {
            const friend = await User.findById(id)
            if (!isUserDoc(friend)) {
                console.error('Retrieving friends error: Friend info cannot be retrieved by id')
                continue
            }

            const friendInfo: FriendClientInfo = {
                id: friend._id,
                username: friend.username,
                status: UserStatus.Offline
            }

            if (onlineUsers[id.toHexString()]) {
                friendInfo.status = UserStatus.Online
                online.push(friendInfo)
            } else {
                offline.push(friendInfo)
            }
        }

        response = successResponse({
            online,
            offline
        })
    } 
    catch (err) {
        response = errorResponse('Something went wrong')
        status = 500
    }

    res.status(status).send(response)
}