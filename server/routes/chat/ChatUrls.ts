export default {
    chatChannelInfoFn: (recipientId: string) => (
        `/chat/channel/recipient/${recipientId}`
    ),
    activeChannels: '/chat/activeChannels',
    chatChanelWithIdFn: (channelId: string) => (
        `/chat/channel/id/${channelId}`
    )
}