import { ActiveChannelInfo } from "../../../server/types/ChatTypes";
import { Action } from "../storeComponents/StoreTypes";
import { ChatCHannelState } from "./chatReducer";

export enum ChatActionTypes {
    CHANGE_CHAT_RECIPIENT = 'CHANGE_RECIPIENT_ID',
    UPDATE_ACTIVE_CHANNELS = "UPDATE_ACTIVE_CHANNELS",
    CHANGE_CHANNEL_ID = "CHANGE_CHANNEL_ID",
    UPDATE_CHAT_CHANNEL = "UPDATE_CHAT_CHANNEL"
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

export const updateChatChannelAction = (channelInfo: ChatCHannelState): ChatAction => ({
    type: ChatActionTypes.UPDATE_CHAT_CHANNEL,
    payload: channelInfo
})