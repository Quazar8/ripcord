import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { RecipientInfo, ChannelClientInfo, ChannelDoc, isChannelDoc } from '../../types/ChatTypes.js'
import { IUserDoc, User } from "../../db/models/user.js";
import { isUserDoc } from "../../types/UserTypes.js";
import { Types } from "mongoose";
import { IChannel, Channel } from '../../db/models/channel.js'

type ChatChannelInfoData = {
    recipient: RecipientInfo,
    channel: ChannelClientInfo
}

export type ChatChannelInfoRes = ServerResponse<ChatChannelInfoData>

export const chatChannelInfoHandler = async (req: ReqWUser, res: Response) => {
    let response: ChatChannelInfoRes = null
    let status: number = 200

    if (!req.user) {
        response = errorResponse('User is missing')
        res.status(400).send(response)
        return
    }

    const { recipientId } = req.params
    if (!recipientId) {
        response = errorResponse('Missing recipient id')
        res.status(400).send(response)
        return
    }

    const channelObj = (idOne: Types.ObjectId, idTwo: Types.ObjectId): IChannel => {
        return {
            participantOne: idOne,
            participantTwo: idTwo,
            createdAt: new Date(),
            messages: []
        }
    }

    const responseData = (channel: ChannelDoc, recipient: IUserDoc): ChatChannelInfoData => {
        const channelInfo: ChannelClientInfo = {
            id: channel._id,
            messages: channel.messages,
            participantOne: channel.participantOne,
            participantTwo: channel.participantTwo
        }

        const recipientInfo: RecipientInfo = {
            id: recipient._id,
            username: recipient.username
        }

        return {
            recipient: recipientInfo,
            channel: channelInfo
        }
    }

    const handleRequest = async (requester: IUserDoc, recipient: IUserDoc) => {
        if (!requester.channels) {
            requester.channels = {}
        }

        if (!recipient.channels) {
            recipient.channels = {}
        }

        const channelId = requester.channels[recipient._id]
        if (!channelId) {
            const newChannel = new Channel(channelObj(requester._id, recipient._id))
            const created = await newChannel.save()

            if (!isChannelDoc(created)) {
                return errorResponse('Couldn\'t create new channel')
            }

            requester.channels[recipient._id] = created._id
            recipient.channels[requester._id] = created._id

            await requester.save()
            await recipient.save()

            return successResponse(responseData(created, recipient))
        }
        
        const channel = await Channel.findById(channelId)
        if (isChannelDoc(channel)) {
            return successResponse(responseData(channel, recipient))
        }

        return errorResponse('Couldn\'t get channel info')
    }

    try {
        const recipient = await User.findById(recipientId)
        if (isUserDoc(recipient)) {
            response = await handleRequest(req.user, recipient)
        } else {
            response = errorResponse('Wrong recipient id')
            status = 400
        }
    }
    catch (err) {
        console.error(err)
        response = errorResponse('Something went wrong')
        status = 500
    }

    res.status(status).send(response)
}