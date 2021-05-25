import { Application } from 'express'
import ChatUrls from './ChatUrls.js'
import { authenticateUser } from '../../middlewares.js'
import { chatChannelInfoHandler, getChannelInfoWId } from './chatChannelInfo.js'
import { getActiveChannels, removeActiveChannel } from './activeChannels.js'

const enableChatRoutes = (app: Application) => {
    app.get(ChatUrls.chatChannelInfoFn(':recipientId'), authenticateUser, chatChannelInfoHandler)

    app.get(ChatUrls.activeChannels, authenticateUser, getActiveChannels)

    app.get(ChatUrls.chatChanelWithIdFn(':channelId'), authenticateUser, getChannelInfoWId)

    app.delete(ChatUrls.removeActiveChanneFn(':channelId'),
        authenticateUser, removeActiveChannel)
}

export default enableChatRoutes