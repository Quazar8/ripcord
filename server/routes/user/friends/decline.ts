import { Response } from "express";
import { Types } from "mongoose";
import { IUserDoc, User } from "../../../db/models/models.js";
import { errorResponse, ServerResponse, successResponse } from "../../../responses.js";
import { ReqWUser } from "../../../types/RequestTypes";
import { isUserDoc } from '../../../types/UserTypes.js'

export type DeclineFriendRequestRes = ServerResponse<{
    declined: boolean
}>

export type DeclineFriendRequestData = {
    declinedId: Types.ObjectId
}

export const declineRequest = async (req: ReqWUser, res: Response) => {
    let response: DeclineFriendRequestRes = null
    let status = 200
    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const { declinedId }: DeclineFriendRequestData = req.body
    if (!declinedId) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const updateUsers = async (requester: IUserDoc, decliner: IUserDoc): Promise<DeclineFriendRequestRes> => {
        let index = decliner.incFriendRequests.indexOf(requester._id)
        if (index > -1) {
            decliner.incFriendRequests.splice(index, 1)
        }

        index = requester.outFriendRequests.indexOf(decliner._id)
        if (index > -1) {
            requester.outFriendRequests.splice(index, 1)
        }

        await decliner.save()
        await requester.save()

        return successResponse({ declined: true })
    }

    try {
        const declinedUser = await User.findById(declinedId)
        const user = await User.findById(req.user.id)

        if (isUserDoc(declinedUser) && isUserDoc(user)) {
            response = await updateUsers(declinedUser, user)
        } else {
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