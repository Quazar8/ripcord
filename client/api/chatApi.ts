import { baseUrl, getQueryOptions } from './reqOptions'
import ChatUrls from '../../server/routes/chat/ChatUrls'
import { ChatChannelInfoRes, GetActiveChannelsRes } from '../../server/types/ChatResponses'

export const getChannelInfo = async (recipientId: string): Promise<ChatChannelInfoRes> => {
    return (await fetch(baseUrl + ChatUrls.chatChannelInfoFn(recipientId),
        getQueryOptions(true))).json()
}

export const getActiveChannels = async (): Promise<GetActiveChannelsRes> => {
    return (await fetch(baseUrl + ChatUrls.activeChannels, getQueryOptions(true))).json()
}