import { Application } from 'express'
import ChatUrls from './ChatUrls.js'
import { authenticateUser } from '../../middlewares.js'
import { chatChannelInfoHandler } from './chatChannelInfo.js'

const enableChatRoutes = (app: Application) => {
    app.post(ChatUrls.chatChannelInfoFn(':channelId'), authenticateUser, chatChannelInfoHandler)
}

export default enableChatRoutes