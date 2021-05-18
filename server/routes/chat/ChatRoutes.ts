import { Application } from 'express'
import ChatUrls from './ChatUrls.js'
import { authenticateUser } from '../../middlewares.js'
import { chatChannelInfoHandler, getActiveChannelInfo } from './chatChannelInfo.js'
import { getActiveChannels } from './activeChannels.js'

const enableChatRoutes = (app: Application) => {
    app.get(ChatUrls.chatChannelInfoFn(':recipientId'), authenticateUser, chatChannelInfoHandler)

    app.get(ChatUrls.activeChannels, authenticateUser, getActiveChannels)

    app.get(ChatUrls.chatChanelWithIdFn(':channelId'), authenticateUser, getActiveChannelInfo)
}

export default enableChatRoutes