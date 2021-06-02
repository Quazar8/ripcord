import { Action } from "../storeComponents/StoreTypes"

export enum FriendsActionTypes {
    FILL_PENDING_REQUESTS = "FILL_PENDING_REQUESTS" 
}

type FriendsAction = Action<FriendsActionTypes, any>

export const fillPendingRequestsAction = (pendingRequests: any): FriendsAction => ({
    type: FriendsActionTypes.FILL_PENDING_REQUESTS,
    payload: pendingRequests
})