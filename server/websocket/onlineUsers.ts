import { Types } from 'mongoose'
import ws from 'ws'
import { WSMessage } from '../types/WebsocketTypes'

type OnlineUsers = {
    [key: string]: ws
}

export const onlineUsers: OnlineUsers = {}

export const sendSocketMsg = (userId: Types.ObjectId, msg: WSMessage<any>) => {
    const socket = onlineUsers[userId.toHexString()]

    if (socket) {
        socket.send(JSON.stringify(msg))
    }
}

export const isOnline = (userId: Types.ObjectId): boolean => {
    if (onlineUsers[userId.toHexString()]) return true

    return false
}