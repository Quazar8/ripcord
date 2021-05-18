import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { isOnline } from '../../websocket/onlineUsers.js'
import { RecipientInfo, ChannelClientInfo, ChannelDoc, isChannelDoc, MessageClient } from '../../types/ChatTypes.js'
import { User } from "../../db/models/user.js";
import { isUserDoc, UserDoc, UserStatus } from "../../types/UserTypes.js";
import { Channel } from '../../db/models/channel.js'

type ChatChannelInfoData = {
    recipient: RecipientInfo,
    channel: ChannelClientInfo
}

export type ChatChannelInfoRes = ServerResponse<ChatChannelInfoData>


const genChatChannelInfoData = (channel: ChannelDoc, recipient: UserDoc): ChatChannelInfoData => {
    const messages: MessageClient[] = channel.messages.map(m => {
        return {
            date: m.date,
            edited: m.edited,
            authorId: m.authorId.toHexString(),
            content: m.content
        }
    }) 

    const channelInfo: ChannelClientInfo = {
        id: channel._id,
        messages,
        participantOne: channel.participantOne.toHexString(),
        participantTwo: channel.participantTwo.toHexString()
    }

    const recipientInfo: RecipientInfo = {
        id: recipient._id.toHexString(),
        username: recipient.username,
        status: isOnline(recipient._id) ? UserStatus.Online : UserStatus.Offline
    }

    return {
        recipient: recipientInfo,
        channel: channelInfo
    }
}

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
                    participantOne: requester._id.toHexString(),
                    participantTwo: recipient._id.toHexString(),
                },
                recipient: {
                    id: recipient._id.toHexString(),
                    username: recipient.username,
                    status: isOnline(requester._id) 
                            ? UserStatus.Online 
                            : UserStatus.Offline
                }
            }) as ChatChannelInfoRes
        }
        
        const channel = await Channel.findById(channelId)
        if (isChannelDoc(channel)) {
            return successResponse(genChatChannelInfoData(channel, recipient))
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

export const getActiveChannelInfo = async (req: ReqWUser, res: Response) => {
    let response: ChatChannelInfoRes = null
    let status: number = 200

    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const { channelId } = req.params
    if (!channelId) {
        response = errorResponse('Channel id is missing')
        res.status(400).send(response)
        return
    }

    try {
        const channel = await Channel.findById(channelId)
        if (!isChannelDoc(channel)) {
            response = errorResponse('Channel id is incorrect')
            status = 400
            return
        }

        let recipientId = channel.participantOne
        if (req.user._id.equals(channel.participantOne)) {
            recipientId = channel.participantTwo
        }

        const recipient = await User.findById(recipientId)
        if (!isUserDoc(recipient)) {
            response = errorResponse('Cannot find the chat participant')
            return
        }

        response = successResponse(genChatChannelInfoData(channel, recipient))
    }
    catch (err) {
        response = errorResponse('Something went wrong')
        status = 500
    }

    res.status(status).send(response)
}