import { PendingFriendInfo } from "../../../server/types/UserTypes"
import { FriendsAction, FriendsActionTypes } from "./friendsActions"

export type FriendRequestsState = {
    incoming: PendingFriendInfo[]
    outgoing: PendingFriendInfo[]
} 

export type FriendsState = {
    friendRequests: FriendRequestsState,
    friendWindowNotifs: number,
    pendingNotifs: number
}

export const friendsStateInit: FriendsState = {
    friendRequests: {
        incoming: [],
        outgoing: []
    },
    friendWindowNotifs: 0,
    pendingNotifs: 0
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

const incrementPendingNotif = (state: FriendsState, amount: number) => {
    const newState = { ...state }
    newState.friendWindowNotifs += amount
    newState.pendingNotifs += amount

    return newState
}

const clearPendingNotifAmount = (state: FriendsState) => {
    const newState = { ...state }
    newState.pendingNotifs = friendsStateInit.pendingNotifs

    return newState
}

const clearFriendsButtonNotif = (state: FriendsState) => {
    const newState = { ...state }
    newState.friendWindowNotifs = friendsStateInit.friendWindowNotifs

    return newState
}

export const friendsReducer = (state: FriendsState = friendsStateInit,
    action: FriendsAction): FriendsState => {
    switch (action.type) {
        case FriendsActionTypes.FILL_PENDING_REQUESTS:
            return fillFriendRequests(state, action.payload)
        case FriendsActionTypes.REMOVE_PENDING_REQUEST:
            return removeFriendRequest(state, action.payload)
        case FriendsActionTypes.INC_PENDING_NOTIF:
            return incrementPendingNotif(state, action.payload)
        case FriendsActionTypes.CLEAR_PENDING_NOTIF_AMOUNT:
            return clearPendingNotifAmount(state)
        case FriendsActionTypes.CLEAR_FRIENDS_BUTTON_NOTIF:
            return clearFriendsButtonNotif(state)
        default: return state
    }
}