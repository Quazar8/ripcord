import { Types } from 'mongoose'
import ws from 'ws'
import { WSMessage } from '../types/WebsocketTypes'

type OnlineUsers = {
    [key: string]: ws
}

export const onlineUsers: OnlineUsers = {}

const isObjectId = (id: Types.ObjectId | string): id is Types.ObjectId => {
    return id.valueOf() === Object
}

export const sendSocketMsg = (userId: Types.ObjectId, msg: WSMessage<any>) => {
    const socket = onlineUsers[userId.toHexString()]

    if (socket) {
        socket.send(JSON.stringify(msg))
    }
}

export const isOnline = (userId: Types.ObjectId | string): boolean => {
    const id = isObjectId(userId) ? userId.toHexString() : userId

    if (onlineUsers[id]) return true

    return false
}

export const sendMultipleSocket = (ids: Types.ObjectId[] ,socketMsg: WSMessage<any>) => {
    for (let id of ids) {
        if (isOnline(id)) {
            sendSocketMsg(id, socketMsg)
        }
    }
}