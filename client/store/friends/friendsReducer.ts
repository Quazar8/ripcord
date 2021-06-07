import { PendingFriendInfo } from "../../../server/types/UserTypes"
import { FriendsAction, FriendsActionTypes } from "./friendsActions"

export type FriendRequestsState = {
    incoming: PendingFriendInfo[]
    outgoing: PendingFriendInfo[]
} 

export type FriendsState = {
    friendRequests: FriendRequestsState,
    friendWWindowNotif: number,
    pendingNotif: number
}

export const friendsStateInit: FriendsState = {
    friendRequests: {
        incoming: [],
        outgoing: []
    },
    friendWWindowNotif: 0,
    pendingNotif: 0
}

const fillFriendRequests = (state: FriendsState, requests: FriendRequestsState): FriendsState => {
    const newState = { ...state }
    newState.friendRequests = requests

    return newState
}

const removeFriendRequest = (state: FriendsState, index: number) => {
    const newState = { ...state }
    if (index > newState.friendRequests.incoming.length - 1) {
        newState.friendRequests.outgoing.splice(
            index - newState.friendRequests.incoming.length, 1)
    } else {
        newState.friendRequests.incoming.splice(index, 1)
    }

    return newState
}

const incrementPendingNotif = (state: FriendsState) => {
    return state
}

export const friendsReducer = (state: FriendsState = friendsStateInit,
    action: FriendsAction): FriendsState => {
    switch (action.type) {
        case FriendsActionTypes.FILL_PENDING_REQUESTS:
            return fillFriendRequests(state, action.payload)
        case FriendsActionTypes.REMOVE_PENDING_REQUEST:
            return removeFriendRequest(state, action.payload)
        case FriendsActionTypes.INC_PENDING_NOTIF:
            return incrementPendingNotif(state)
        default: return state
    }
}