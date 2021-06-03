import { Action } from "../storeComponents/StoreTypes"
import { FriendRequestsState } from "./friendsReducer"

export enum FriendsActionTypes {
    FILL_PENDING_REQUESTS = "FILL_PENDING_REQUESTS",
    REMOVE_PENDING_REQUEST = "REMOVE_PENDING_REQUEST"
}

export type FriendsAction = Action<FriendsActionTypes, any>

export const fillPendingRequestsAction = (pendingRequests: FriendRequestsState): FriendsAction => ({
    type: FriendsActionTypes.FILL_PENDING_REQUESTS,
    payload: pendingRequests
})

export const removeFriendRequest = (index: number): FriendsAction => ({
    type: FriendsActionTypes.REMOVE_PENDING_REQUEST,
    payload: index
})