import { PendingFriendInfo } from "../../../server/types/userTypes"
import { Action } from "../storeComponents/StoreTypes"
import { FriendRequestsState } from "./friendsReducer"

export enum FriendsActionTypes {
    FILL_PENDING_REQUESTS = "FILL_PENDING_REQUESTS",
    REMOVE_PENDING_REQUEST = "REMOVE_PENDING_REQUEST",
    INC_PENDING_NOTIF = "INC_PENDING_NOTIF",
    CLEAR_PENDING_NOTIF_AMOUNT = "CLEAR_PENDING_NOTIF_AMOUNT",
    CLEAR_FRIENDS_BUTTON_NOTIF = "CLEAR_FRIENDS_BUTTON_NOTIF",
    ADD_INC_FRIEND_REQUEST = "ADD_INC_FRIEND_REQUEST",
}

export type FriendsAction = Action<FriendsActionTypes, any>

export const fillPendingRequestsAction = (pendingRequests: FriendRequestsState): FriendsAction => ({
    type: FriendsActionTypes.FILL_PENDING_REQUESTS,
    payload: pendingRequests
})

export const removeFriendRequestAction = (index: number): FriendsAction => ({
    type: FriendsActionTypes.REMOVE_PENDING_REQUEST,
    payload: index
})

export const incrementPendingNotif = (amount: number): FriendsAction => ({
    type: FriendsActionTypes.INC_PENDING_NOTIF,
    payload: amount
})

export const clearPendingNotifAmountAction = (): FriendsAction => ({
    type: FriendsActionTypes.CLEAR_PENDING_NOTIF_AMOUNT,
    payload: null
})

export const clearFriendsButtonNotifAction = (): FriendsAction => ({
    type: FriendsActionTypes.CLEAR_FRIENDS_BUTTON_NOTIF,
    payload: null
})

export const addIncFriendRequestAction = (pendingReq: PendingFriendInfo): FriendsAction => ({
    type: FriendsActionTypes.ADD_INC_FRIEND_REQUEST,
    payload: pendingReq
})