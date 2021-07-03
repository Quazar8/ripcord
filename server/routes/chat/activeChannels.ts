import { Response } from "express";
import { ReqWUser } from '../../types/RequestTypes'
import { successResponse, errorResponse, ServerResponse } from '../../responses.js'
import { ActiveChannelInfo, ChannelDoc, isChannelDoc } from "../../types/ChatTypes.js";
import { Channel } from "../../db/models/channel.js";
import { isUserDoc, UserDoc, UserStatus } from "../../types/UserTypes.js";
import { User } from "../../db/models/user.js";
import { isValidObjectId } from '../../methods/utils.js'
import { Types } from "mongoose";
import { isOnline } from "../../websocket/onlineUsers";

export type GetActiveChannelsRes = ServerResponse<{
    activeChannels: ActiveChannelInfo[]
}>

export type RemoveActiveChannelRes = ServerResponse<{
    removed: boolean
}>

export type ActiveChannelInfoRes = ServerResponse<{
    channelInfo: ActiveChannelInfo
}>

type ActiveChannelInfoWDate = {
    channelInfo: ActiveChannelInfo
    lastMsgDate: Date
    objectId: Types.ObjectId
}

const createActiveChannelInfo = async (channel: ChannelDoc, byUser: UserDoc): Promise<ActiveChannelInfo> => {
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
        recipientUsername: recipient.username,
        recipientPic: recipient.profilePic,
    }
}

export const getActiveChannels = async (req: ReqWUser, res: Response) => {
    let response: GetActiveChannelsRes = null
    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const activeChannels = req.user.activeChannels
    const data: ActiveChannelInfoWDate[] = new Array(activeChannels.length)

    for (let i = 0; i < activeChannels.length; i++) {
        const id = activeChannels[i]
        const channel = await Channel.findById(id)

        if (isChannelDoc(channel)) {
            const channelInfo = await createActiveChannelInfo(channel, req.user)
            if (channelInfo) {
                data[i] = {
                    channelInfo,
                    lastMsgDate: channel.messages[channel.messages.length - 1].date,
                    objectId: channel._id
                }
            }
        }
    }

    const sortFunc = (a: ActiveChannelInfoWDate, b: ActiveChannelInfoWDate) => {
        return a.lastMsgDate > b.lastMsgDate ? -1 : 0
    }

    data.sort(sortFunc)
    const resultChannels = data.map(a => a.channelInfo)

    req.user.activeChannels = data.map(a => a.objectId)
    req.user.save()

    response = successResponse({
        activeChannels: resultChannels
    })

    res.send(response)
}

export const removeActiveChannel = async (req: ReqWUser, res: Response) => {
    let response: RemoveActiveChannelRes = null

    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    const { channelId } = req.params
    if (!isValidObjectId(channelId)) {
        response = errorResponse('No channel id provided')
        res.status(400).send(response)
        return
    }

    try {
        const activeChannels = req.user.activeChannels
        for (let i = 0; i < activeChannels.length; i++) {
            if (!activeChannels[i].equals(channelId)) continue;

            activeChannels.splice(i, 1)
            await req.user.save()
            response = successResponse({ removed: true })
            res.status(200).send(response)
            return
        }

        response = errorResponse('Incorrect channel id')
        res.status(400).send(response)
    }
    catch (err) {
        console.error(err)
        response = errorResponse('Something went wrong')
        res.status(500).send(response)
    }
}

export const getActiveChannelInfo = async (req: ReqWUser, res: Response) => {
    let response: ActiveChannelInfoRes = null
    let status: number = 200

    if (!req.user) {
        response = errorResponse('No user provided')
        res.status(400).send(response)
        return
    }

    let { channelId } = req.params
    const recipientId = req.query.recipientId
    
    if (!isValidObjectId(channelId)) {
        if (!isValidObjectId(recipientId)) {
            response = errorResponse('No valid channel id provided')
            res.status(400).send(response)
            return
        }

        if (!req.user.channels) {
            req.user.channels = {}
        }
        channelId = req.user.channels[recipientId as string] as unknown as string

        if (!channelId) {
            response = errorResponse('No valid channel id provided')
            res.status(400).send(response)
            return
        }
    }
    
    try {
        const channel = await Channel.findById(channelId)

        if (isChannelDoc(channel)) {
            if (!channel.participantOne.equals(req.user._id)
                    && !channel.participantTwo.equals(req.user._id)) {
                response = errorResponse('User doesn\'t particiapte in such a channel')
                res.status(400).send(response)
                return
            }

            const channelInfo = await createActiveChannelInfo(channel, req.user)
            response = successResponse({
                channelInfo
            })
        } else {
            response = errorResponse('Couldn\'t find the channel')
            status = 400
        }
    }
    catch (err) {
        console.log('Getting single active channel error:')
        console.log(err)
        response = errorResponse('Something went wrong')
        status = 500
    }

    res.status(status).send(response)
}