import { PendingFriendInfo } from "../../../server/types/UserTypes"
import { FriendsAction, FriendsActionTypes } from "./friendsActions"

export type FriendRequestsState = {
    incoming: PendingFriendInfo[]
    outgoing: PendingFriendInfo[]
} 

type FriendsStateType = {
    friendRequests: FriendRequestsState
}

const friendsStateInit: FriendsStateType = {
    friendRequests: {
        incoming: [],
        outgoing: []
    }
}

const fillFriendRequests = (state: FriendsStateType, requests: FriendRequestsState): FriendsStateType => {
    return state
} 

export const friendsReducer = (state: FriendsStateType = friendsStateInit,
    action: FriendsAction): FriendsStateType => {
    switch (action.type) {
        case FriendsActionTypes.FILL_PENDING_REQUESTS:
            return fillFriendRequests(state, action.payload)
        default: return state
    }
}