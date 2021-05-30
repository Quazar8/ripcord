import { baseUrl, deleteOptionsInit, getQueryOptions } from './reqOptions'
import ChatUrls from '../../server/routes/chat/ChatUrls'
import { ChatChannelInfoRes, GetActiveChannelsRes,
         ChatCHannelWIdRes, 
         RemoveActiveChannelRes,
         ActiveChannelInfoRes} from '../../server/types/ChatResponses'

export const getChannelInfo = async (recipientId: string): Promise<ChatChannelInfoRes> => {
    return (await fetch(baseUrl + ChatUrls.chatChannelInfoFn(recipientId),
        getQueryOptions(true))).json()
}

export const getActiveChannels = async (): Promise<GetActiveChannelsRes> => {
    return (await fetch(baseUrl + ChatUrls.activeChannels, getQueryOptions(true))).json()
}

export const getChannelInfoWId = async (channelId: string): Promise<ChatCHannelWIdRes> => {
    return (await fetch(baseUrl + ChatUrls.chatChanelWithIdFn(channelId),
        getQueryOptions(true))).json()
}

export const removeActiveChannel = async (channelId: string): Promise<RemoveActiveChannelRes> => {
    return (await fetch(baseUrl + ChatUrls.removeActiveChanneFn(channelId),
        deleteOptionsInit())).json()
}

export const getActiveChannelInfo = async (channelId: string,
        recipientId?: string): Promise<ActiveChannelInfoRes> => {
    let url = new URL(baseUrl + ChatUrls.getActiveChannelInfoFn(channelId))
    if (!channelId && recipientId) {
        url.searchParams.append('recipientId', recipientId)
    }

    return (await fetch(url.toString(), getQueryOptions(true))).json()
}