export default {
    chatChannelInfoFn: (recipientId: string) => (
        `/chat/channel/${recipientId}`
    ),
    activeChannels: '/chat/activeChannels'
}