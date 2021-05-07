import { Response } from "express";
import { Types } from "mongoose";
import { IUserDoc, User } from "../../../db/models/models.js";
import { errorResponse, ServerResponse, successResponse } from "../../../responses.js";
import { ReqWUser } from "../../../types/RequestTypes";
import { isUserDoc } from '../../../types/UserTypes.js'

export type DeclineFriendRequestRes = ServerResponse<{
    removed: boolean
}>

export type DeclineFriendRequestData = {
    declinedId: Types.ObjectId,
    declineInc: boolean
}

export type AcceptFriendRequestRes = ServerResponse<{
    accepted: boolean
}>

export type AcceptFriendRequestData = {
    acceptedId: Types.ObjectId
}

export const declineRequest = async (req: ReqWUser, res: Response) => {
    let response: DeclineFriendRequestRes = null
    let status = 200
    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const { declinedId, declineInc }: DeclineFriendRequestData = req.body
    if (!declinedId || declineInc === undefined) {
        response = errorResponse('No all request fields are provided')
        res.status(400).send(response)
        return
    }

    const updateUsers = async (requester: IUserDoc, decliner: IUserDoc): Promise<DeclineFriendRequestRes> => {
        let index = decliner.incFriendRequests.indexOf(requester._id)
        if (index > -1) {
            decliner.incFriendRequests.splice(index, 1)
        } else {
            status = 400
            return errorResponse('User id is not present in the friend requests')
        }

        index = requester.outFriendRequests.indexOf(decliner._id)
        if (index > -1) {
            requester.outFriendRequests.splice(index, 1)
        } else {
            status = 400
            return errorResponse('User id is not present in the friend requests')
        }

        await decliner.save()
        await requester.save()

        return successResponse({ removed: true })
    }

    try {
        const declinedUser = await User.findById(declinedId)
        const user = await User.findById(req.user.id)

        if (isUserDoc(declinedUser) && isUserDoc(user)) {
            response = declineInc ? await updateUsers(declinedUser, user)
                                  : await updateUsers(user, declinedUser)
        } else {
            status = 400
            response = errorResponse('Wrong user id\'s')
        }

    }
    catch (err) {
        console.error(err)
        response = errorResponse('Something went wrong')
        status = 500
    }

    res.status(status).send(response)
}

export const acceptFriendRequest = async (req: ReqWUser, res: Response) => {
    let response: AcceptFriendRequestRes = null
    let status: number = 200

    if (!req.user) {
        response = errorResponse('User is missing')
        res.status(400).send(response)
        return
    }

    const { acceptedId }: AcceptFriendRequestData = req.body
    if (!acceptedId) {
        response = errorResponse('Missing entry fields')
        res.status(400).send(response)
        return
    }

    try {
        const acceptedUser = await User.findById(acceptedId)
        const user = await User.findById(req.user.id)
        
        if (isUserDoc(acceptedUser) && isUserDoc(user)) {

        } else {
            response = errorResponse('Incorrect users provided')
            status = 400
        }


    } catch (err) {
        console.error(err)
        response = errorResponse('Something went wrong')
        status = 500
    }

    res.status(status).send(response)
}