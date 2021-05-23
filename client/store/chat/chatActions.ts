import { ActiveChannelInfo, ChatMessageStatusPayload } from "../../../server/types/ChatTypes";
import { PendingMsg } from "../../types/ChatClientTypes";
import { Action } from "../storeComponents/StoreTypes";
import { ChatChannelState } from "./chatReducer";

export enum ChatActionTypes {
    CHANGE_CHAT_RECIPIENT = 'CHANGE_RECIPIENT_ID',
    UPDATE_ACTIVE_CHANNELS = "UPDATE_ACTIVE_CHANNELS",
    CHANGE_CHANNEL_ID = "CHANGE_CHANNEL_ID",
    UPDATE_CHAT_CHANNEL = "UPDATE_CHAT_CHANNEL",
    SEND_CHAT_MSG = "SEND_CHAT_MSG",
    SENT_MSG_RESPONSE = "SENT_MSG_RESPONSE",
    CHANGE_MSG_STATUS_FAIL = "CHANGE_MSG_STATUS_FAIL"
}

export type ChatAction = Action<ChatActionTypes, any>

export const changeCHatRecipientAction = (recipientId: string): ChatAction => ({
    type: ChatActionTypes.CHANGE_CHAT_RECIPIENT,
    payload: recipientId
})

export const updateActiveChannelsAction = (channels: ActiveChannelInfo[]): ChatAction => ({
    type: ChatActionTypes.UPDATE_ACTIVE_CHANNELS,
    payload: channels
})

export const changeChannelIdAction = (channelId: string): ChatAction => ({
    type: ChatActionTypes.CHANGE_CHANNEL_ID,
    payload: channelId
})

export const updateChatChannelAction = (channelInfo: ChatChannelState): ChatAction => ({
    type: ChatActionTypes.UPDATE_CHAT_CHANNEL,
    payload: channelInfo
})

export const sendChatMsgAction = (msg: PendingMsg): ChatAction => ({
    type: ChatActionTypes.SEND_CHAT_MSG,
    payload: msg
})

export const sentMsgResponseAction = (response: ChatMessageStatusPayload): ChatAction => ({
    type: ChatActionTypes.SENT_MSG_RESPONSE,
    payload: response
})

export const changeMsgToFailAction = (temporaryId: string): ChatAction => ({
    type: ChatActionTypes.CHANGE_MSG_STATUS_FAIL,
    payload: temporaryId
})