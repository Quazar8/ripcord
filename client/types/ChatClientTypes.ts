import { MessageClient } from "../../server/types/ChatTypes";

export enum PendingMsgStatus {
    Delivered,
    Failed,
    Pending
}

export type PendingMsg = MessageClient & {
    channelId?: string
    temporaryId?: string,
    status?: PendingMsgStatus
}