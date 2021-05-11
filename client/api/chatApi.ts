import { baseUrl, getQueryOptions } from './reqOptions'
import ChatUrls from '../../server/routes/chat/ChatUrls'
import { ChatChannelInfoRes } from '../../server/types/ChatResponses'

export const getChannelInfo = async (recipientId: string): Promise<ChatChannelInfoRes> => {
    return (await fetch(baseUrl + ChatUrls.chatChannelInfoFn(recipientId),
        getQueryOptions(true))).json()
}