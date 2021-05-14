import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { isOnline } from '../../websocket/onlineUsers.js'
import { RecipientInfo, ChannelClientInfo, ChannelDoc, isChannelDoc } from '../../types/ChatTypes.js'
import { User } from "../../db/models/user.js";
import { isUserDoc, UserDoc, UserStatus } from "../../types/UserTypes.js";
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
    
    if (req.user._id.equals(recipientId)) {
        response = errorResponse('Cannot open a channel with yourself')
        res.status(400).send(response)
        return
    }

    const responseData = (channel: ChannelDoc, recipient: UserDoc): ChatChannelInfoData => {
        const channelInfo: ChannelClientInfo = {
            id: channel._id,
            messages: channel.messages,
            participantOne: channel.participantOne,
            participantTwo: channel.participantTwo
        }

        const recipientInfo: RecipientInfo = {
            id: recipient._id,
            username: recipient.username,
            status: isOnline(recipient._id) ? UserStatus.Online : UserStatus.Offline
        }

        return {
            recipient: recipientInfo,
            channel: channelInfo
        }
    }

    const handleRequest = async (requester: UserDoc, recipient: UserDoc) => {
        if (!requester.channels) {
            requester.channels = {}
        }

        if (!recipient.channels) {
            recipient.channels = {}
        }

        const channelId = requester.channels[recipient._id.toHexString()]
        if (!channelId) {
            return successResponse({
                channel: {
                    id: null,
                    messages: [],
                    participantOne: requester._id,
                    participantTwo: recipient._id,
                },
                recipient: {
                    id: recipient._id,
                    username: recipient.username,
                    status: isOnline(requester._id) 
                            ? UserStatus.Online 
                            : UserStatus.Offline
                }
            }) as ChatChannelInfoRes
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