import { PendingFriendInfo } from "../../../server/types/UserTypes"
import { FriendsAction, FriendsActionTypes } from "./friendsActions"

export type FriendRequestsState = {
    incoming: PendingFriendInfo[]
    outgoing: PendingFriendInfo[]
} 

export type FriendsState = {
    friendRequests: FriendRequestsState
}

export const friendsStateInit: FriendsState = {
    friendRequests: {
        incoming: [],
        outgoing: []
    }
}

const fillFriendRequests = (state: FriendsState, requests: FriendRequestsState): FriendsState => {
    return state
} 

export const friendsReducer = (state: FriendsState = friendsStateInit,
    action: FriendsAction): FriendsState => {
    switch (action.type) {
        case FriendsActionTypes.FILL_PENDING_REQUESTS:
            return fillFriendRequests(state, action.payload)
        default: return state
    }
}