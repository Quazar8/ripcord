import { MessageClient } from "../../server/types/ChatTypes";

export enum PendingMsgStatus {
    Delivered,
    Failed,
    Pending
}

export type PendingMsg = MessageClient & {
    temporaryId?: string,
    status?: PendingMsgStatus
}