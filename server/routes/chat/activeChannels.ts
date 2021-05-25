import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { ActiveChannelInfo, ChannelDoc, isChannelDoc } from "../../types/ChatTypes.js";
import { Channel } from "../../db/models/channel.js";
import { isUserDoc, UserDoc } from "../../types/UserTypes.js";
import { User } from "../../db/models/user.js";

export type GetActiveChannelsRes = ServerResponse<{
    activeChannels: ActiveChannelInfo[]
}>

export const getActiveChannels = async (req: ReqWUser, res: Response) => {
    let response: GetActiveChannelsRes = null
    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const getActiveChannelInfo = async (channel: ChannelDoc, byUser: UserDoc): Promise<ActiveChannelInfo> => {
        let recipient = null
        if (channel.participantOne.equals(byUser._id)) {
            recipient = await User.findById(channel.participantTwo)
        } else {
            recipient = await User.findById(channel.participantOne)
        }

        if (!isUserDoc(recipient)) {
            console.error('Getting Active Channels Error: Cannot get recipient')
            return null
        }

        return {
            id: channel._id.toHexString(),
            recipientId: recipient._id.toHexString(),
            recipientUsername: recipient.username
        }
    }

    const data: ActiveChannelInfo[] = []
    for (let id of req.user.activeChannels) {
        const channel = await Channel.findById(id)
        if (isChannelDoc(channel)) {
            const channelInfo = await getActiveChannelInfo(channel, req.user)
            if (channelInfo) data.push(channelInfo)
        }
    }

    response = successResponse({
        activeChannels: data
    })

    res.send(response)
}

export const removeActiveChannel = (req: ReqWUser, res: Response) => {
    res.send(successResponse({}))
}