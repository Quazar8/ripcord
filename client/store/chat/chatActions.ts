import { ActiveChannelInfo, ChatMessageStatusPayload, ChatReceiverPayload } from "../../../server/types/ChatTypes";
import { ReceivingCallPayload } from "../../../server/types/WebsocketTypes";
import { ClientActiveChannel, PendingMsg } from "../../types/ChatClientTypes";
import { Action } from "../storeComponents/StoreTypes";
import { ChatChannelState } from "./chatReducer";

export enum ChatActionTypes {
    CHANGE_CHAT_RECIPIENT = 'CHANGE_RECIPIENT_ID',
    UPDATE_ACTIVE_CHANNELS = "UPDATE_ACTIVE_CHANNELS",
    CHANGE_CHANNEL_ID = "CHANGE_CHANNEL_ID",
    UPDATE_CHAT_CHANNEL = "UPDATE_CHAT_CHANNEL",
    SEND_CHAT_MSG = "SEND_CHAT_MSG",
    SENT_MSG_RESPONSE = "SENT_MSG_RESPONSE",
    CHANGE_MSG_STATUS_FAIL = "CHANGE_MSG_STATUS_FAIL",
    PUSH_MSG_TO_CHANNEL = "PUSH_MSG_TO_CHANNEL",
    REMOVE_ACTIVE_CHANNEL = "REMOVE_ACTIVE_CHANNEL",
    ADD_ACTIVE_CHANNEL = "ADD_ACTIVE_CHANNEL",
    MOVE_ACTIVE_CHANNEL_TOP = "MOVE_ACTIVE_CHANNEL_TOP",
    INC_ACTIVE_CHANNEL_NEW_MSG = "INC_ACTIVE_CHANNEL_NEW_MSG",
    CLEAR_ACTIVE_CHANNEL_NOTIF = "CLEAR_ACTIVE_CHANNEL_NOTIF",
    RECEIVING_CALL = "RECEIVING_CALL",
    REMOVE_INC_CALL = "REMOVE_INC_CALL",
    ADD_CALL_INFO = "ADD_CALL_INFO",
    REMOVE_CALL_INFO = "REMOVE_CALL_INFO",
}

export type ChatAction = Action<ChatActionTypes, any>

export const changeCHatRecipientAction = (recipientId: string): ChatAction => ({
    type: ChatActionTypes.CHANGE_CHAT_RECIPIENT,
    payload: recipientId
})

export const updateActiveChannelsAction = (channels: ClientActiveChannel[]): ChatAction => ({
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

export const pushReceivedMsgAction = (msg: ChatReceiverPayload): ChatAction => ({
    type: ChatActionTypes.PUSH_MSG_TO_CHANNEL,
    payload: msg
})

export const removeActiveChannelAction = (channelId: string): ChatAction => ({
    type: ChatActionTypes.REMOVE_ACTIVE_CHANNEL,
    payload: channelId
})

export const addActiveChannelAction = (activeChannel: ClientActiveChannel): ChatAction => ({
    type: ChatActionTypes.ADD_ACTIVE_CHANNEL,
    payload: activeChannel
})

export const moveChannelToTopAction = (channelId: string): ChatAction => ({
    type: ChatActionTypes.MOVE_ACTIVE_CHANNEL_TOP,
    payload: channelId
})

export const incrementActiveChannelNewMsgAction = (channelId: string): ChatAction => ({
    type: ChatActionTypes.INC_ACTIVE_CHANNEL_NEW_MSG,
    payload: channelId
})

export const clearActiveChannelNotifAction = (channelId: string): ChatAction => ({
    type: ChatActionTypes.CLEAR_ACTIVE_CHANNEL_NOTIF,
    payload: channelId
})

export const receivingCallAction = (payload: ReceivingCallPayload): ChatAction => ({
    type: ChatActionTypes.RECEIVING_CALL,
    payload
})

export const removeIncCallInfoAction = (): ChatAction => ({
    type: ChatActionTypes.REMOVE_INC_CALL,
    payload: null
})

export const addCallInfoAction = (otherUserId: string): ChatAction => ({
    type: ChatActionTypes.ADD_CALL_INFO,
    payload: otherUserId
})

export const removeCallInfoAction = (): ChatAction => ({
    type: ChatActionTypes.REMOVE_CALL_INFO,
    payload: null
})