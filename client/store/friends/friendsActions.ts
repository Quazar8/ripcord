import { Action } from "../storeComponents/StoreTypes"
import { FriendRequestsState } from "./friendsReducer"

export enum FriendsActionTypes {
    FILL_PENDING_REQUESTS = "FILL_PENDING_REQUESTS",
    REMOVE_PENDING_REQUEST = "REMOVE_PENDING_REQUEST",
    INC_PENDING_NOTIF = "INC_PENDING_NOTIF"
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

export const incrementPendingNotif = (): FriendsAction => ({
    type: FriendsActionTypes.INC_PENDING_NOTIF,
    payload: null
})