import { ActiveChannelInfo, ChannelClientInfo, ChatMessageStatus, MessageClient } from "../../server/types/ChatTypes";

export type PendingMsg = MessageClient & {
    channelId?: string
    temporaryId?: string,
    status?: ChatMessageStatus
}

export type ClientChannelInfoWPending = 
    Omit<ChannelClientInfo, 'messages'> & {
    messages: PendingMsg[]
}

export type ClientActiveChannel = ActiveChannelInfo & {
    newMsgs: number
}