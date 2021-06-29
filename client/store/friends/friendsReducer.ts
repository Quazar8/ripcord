import { FriendClientInfo, PendingFriendInfo } from "../../../server/types/UserTypes"
import { FriendsAction, FriendsActionTypes } from "./friendsActions"

export type FriendRequestsState = {
    incoming: PendingFriendInfo[]
    outgoing: PendingFriendInfo[]
}

export type FriendsState = {
    friendRequests: FriendRequestsState
    friendWindowNotifs: number
    pendingNotifs: number
    friendsList: {
        online: FriendClientInfo[],
        offline: FriendClientInfo[]
    }
}

export const friendsStateInit: FriendsState = {
    friendRequests: {
        incoming: [],
        outgoing: []
    },
    friendWindowNotifs: 0,
    pendingNotifs: 0,
    friendsList: {
        online: [],
        offline: []
    }
}

const fillFriendRequests = (state: FriendsState, requests: FriendRequestsState): FriendsState => {
    const newState = { ...state }
    newState.friendRequests = requests

    return newState
}

const removeFriendRequest = (state: FriendsState, index: number) => {
    const newState = { ...state }
    
    const removeFromOutgoing = (outgoing: PendingFriendInfo[], id: string) => {
        for (let i = 0; i < outgoing.length; i++) {
            if (outgoing[i].id !== id) continue;

            outgoing.splice(i, 1)
        }

        return outgoing
    }

    if (index > newState.friendRequests.incoming.length - 1) {
        newState.friendRequests.outgoing.splice(
            index - newState.friendRequests.incoming.length, 1)
    } else {
        const friendId = newState.friendRequests.incoming[index].id
        newState.friendRequests.outgoing =
            removeFromOutgoing(newState.friendRequests.outgoing, friendId)

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
    if (state.pendingNotifs < 1) {
        return state
    }

    const newState = { ...state }
    newState.pendingNotifs = friendsStateInit.pendingNotifs

    return newState
}

const clearFriendsButtonNotif = (state: FriendsState) => {
    if (state.friendWindowNotifs < 1) {
        return state
    }
    
    const newState = { ...state }
    newState.friendWindowNotifs = friendsStateInit.friendWindowNotifs

    return newState
}

const addIncFriendRequest = (state: FriendsState, info: PendingFriendInfo) => {
    const newState = { ...state }

    newState.friendRequests.incoming.push(info)
    newState.pendingNotifs++
    newState.friendWindowNotifs++

    return newState
}

const fillFriendsList = (state: FriendsState, friendsList: FriendsState['friendsList']) => {
    return {
        ...state,
        friendsList
    }
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
        case FriendsActionTypes.ADD_INC_FRIEND_REQUEST:
            return addIncFriendRequest(state, action.payload)
        case FriendsActionTypes.FILL_FRIENDS_LIST:
            return fillFriendsList(state, action.payload)
        default: return state
    }
}