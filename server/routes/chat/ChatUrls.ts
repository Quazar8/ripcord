export default {
    chatChannelInfoFn: (recipientId: string) => (
        `/chat/channel/recipient/${recipientId}`
    ),
    activeChannels: '/chat/activeChannels',
    chatChanelWithIdFn: (channelId: string) => (
        `/chat/channel/id/${channelId}`
    ),
    removeActiveChanneFn: (channelId: string) => (
        `/chat/activeChannels/${channelId}/remove`
    ),
    getActiveChannelInfoFn: (channelId: string) => (
        `/chat/activeChannels/${channelId}/get`
    )
}