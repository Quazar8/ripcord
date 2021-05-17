import { ActiveChannelInfo } from "../../../server/types/ChatTypes";
import { Action } from "../storeComponents/StoreTypes";

export enum ChatActionTypes {
    CHANGE_CHAT_RECIPIENT,
    UPDATE_ACTIVE_CHANNELS
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