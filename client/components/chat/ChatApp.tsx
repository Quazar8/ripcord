import React, { Dispatch, useEffect, useState } from 'react'
import { closeSocketConnection, establishWS } from '../../socket/socket'
import { UserState } from '../../store/globalReducer'
import { AppAction, connect, MapDispatchFn, MapStateFn } from '../../store/store'
import { logoutUser } from '../../api/userApi'
import { resHasError } from '../../api/utils'
import { toggleUserMenuAction, 
         removeUserInfoAction, 
         pushNotification } from '../../store/globalActions'

import RightWindow from './RightWindow/RightWindow'
import ChatMenu from './ChatMenu/ChatMenu'
import UserMenu from '../user-menu/UserMenu'
import { addActiveChannelAction, changeChannelIdAction,
         changeCHatRecipientAction,
         changeMsgToFailAction,
         clearActiveChannelNotifAction,
         moveChannelToTopAction,
         removeActiveChannelAction,
         removeIncCallInfoAction,
         sendChatMsgAction,
         updateActiveChannelsAction,
         updateChatChannelAction } from '../../store/chat/chatActions'
import { ChatChannelState, ChatState } from '../../store/chat/chatReducer'
import { ClientActiveChannel, PendingMsg } from '../../types/ChatClientTypes'
import { FriendRequestsState, FriendsState } from '../../store/friends/friendsReducer'
import { clearFriendsButtonNotifAction,
         clearPendingNotifAmountAction,
         fillFriendsListAction,
         fillPendingRequestsAction,
         removeFriendFromListAction,
         removeFriendRequestAction } from '../../store/friends/friendsActions'

type ChatStateProps = {
    user: UserState
    showUserMenu: boolean
    recipientId: string
    channelId: string
    activeChannels: ClientActiveChannel[]
    channelInfo: ChatChannelState
    friendsState: {
        friendNotifications: FriendsState['friendWindowNotifs']
        pendingRequests: FriendsState['pendingNotifs']
        friendRequests: FriendsState['friendRequests']
        friendsList: FriendsState['friendsList']
    }
    callState: {
        callInfo: ChatState['callInfo']
    }
}

type ChatDispProps = {
    showUserMenuFn: () => void
    hideUserMenuFn: () => void
    logoutFn: () => void
    dispNotification: ReturnType<typeof pushNotification>,
    dispatch: Dispatch<AppAction>,
    updateActiveChannelsFn: (channels: ClientActiveChannel[]) => void
    changeChannelIdFn: (channelId: string) => void
    changeRecipientIdFn: (recipientId: string) => void
    updateChannelInfoFn: (channelInfo: ChatChannelState) => void
    pushSentMsgToStoreFn: (msg: PendingMsg) => void
    markMsgAsFailedFn: (temporaryId: string) => void
    removeChannelFromListFn: (channelId: string) => void
    appendActiveChannelFn: (channelInfo: ClientActiveChannel) => void
    moveActiveChToTopFn: (channelId: string) => void
    fillFriendRequestsFn: (friendRequests: FriendRequestsState) => void
    removeFriendRequestFn: (index: number) => void
    clearFriendButtonNotifFn: () => void
    clearPendingButtonNotifFn: () => void
    clearActiveChannelNotifFn: (channelId: string) => void
    fillFriendsListFn: (listObj: FriendsState['friendsList']) => void
    removeFriendFromListFn: (id: string) => void
    callFns: {
        removeCallInfoStore: () => void
    }
}

export type ChatAppProps = ChatStateProps & ChatDispProps

export enum RightWindows {
    ChatDisplay,
    FriendsWindow
}

const ChatAppView = (props: ChatAppProps) => {
    const [showWindows, setShowWindows] = useState<{
        [key:string]: boolean
        FriendsWindow: boolean
        ChatDisplay: boolean
    }>({
        ChatDisplay: true,
        FriendsWindow: false
    })

    const showWindow = (window: RightWindows, value: boolean) => {
        const newState = { ...showWindows }
        for (let key of Object.keys(newState)) {
            newState[key] = false
        }

        switch (window) {
            case RightWindows.FriendsWindow:
                newState.FriendsWindow = value; break;
            default: newState.ChatDisplay = value;
        }

        setShowWindows(newState)
    }

    const toggleChatWRecipientId = (recipientId: string) => {
        props.changeRecipientIdFn(recipientId)
        showWindow(RightWindows.ChatDisplay, true)
    }

    const toggleChatWChannelId = (channelId: string) => {
        props.changeChannelIdFn(channelId)
        showWindow(RightWindows.ChatDisplay, true)
    }

    const toggleFriendsWindow = () => {
        showWindow(RightWindows.FriendsWindow, !showWindows.FriendsWindow)
    }

    useEffect(() => {
        establishWS(props.dispatch)

        return () => {
            closeSocketConnection()
        }
    }, [])

    return (
        <section className = "chat-app">
            <ChatMenu 
                user = { props.user }
                showUserMenuFn = { props.showUserMenuFn }
                toggleFriendsWindowFn = { toggleFriendsWindow }
                friendNotifications = { props.friendsState.friendNotifications }
                updateActiveChannelsFn = { props.updateActiveChannelsFn }
                activeChannels = { props.activeChannels }
                toggleChatWChannelId = { toggleChatWChannelId }
                removeChannelFromListFn = { props.removeChannelFromListFn}
                clearFriendButtonNotifFn = { props.clearFriendButtonNotifFn }
                clearActiveChannelNotifFn = { props.clearActiveChannelNotifFn }
            />
            <RightWindow 
                showFriendsWindow = { showWindows.FriendsWindow }
                dispNotification = { props.dispNotification }
                recipientId = { props.recipientId }
                user = { props.user }
                channelId = { props.channelId }
                toggleChatWRecipientId = { toggleChatWRecipientId }
                updateChannelInfoFn = { props.updateChannelInfoFn }
                channelInfo = { props.channelInfo }
                pushSentMsgToStoreFn = { props.pushSentMsgToStoreFn }
                markMsgAsFailedFn = { props.markMsgAsFailedFn }
                appendActiveChannelFn = { props.appendActiveChannelFn }
                activeChannels = { props.activeChannels}
                moveActiveChToTopFn = { props.moveActiveChToTopFn }
                fillFriendRequestsFn = { props.fillFriendRequestsFn }
                removeFriendRequestFn = { props.removeFriendRequestFn }
                clearPendingButtonNotifFn = { props.clearPendingButtonNotifFn }
                fillFriendsListFn = { props.fillFriendsListFn }
                removeFriendFromListFn = { props.removeFriendFromListFn }
                callState = { props.callState }
                friendsState = { props.friendsState }
                callFns = { props.callFns }
            />
            <UserMenu 
                showUserMenu = { props.showUserMenu }
                hideUserMenuFn = { props.hideUserMenuFn }
                logoutFn = { props.logoutFn }
                user = { props.user }
            />
        </section>
    )
}

const mapState: MapStateFn<ChatStateProps> = (state) => ({
    user: state.global.user,
    showUserMenu: state.global.showUserOptions,
    recipientId: state.chat.currentRecipientId,
    activeChannels: state.chat.activeChannels,
    channelId: state.chat.currentChannelId,
    channelInfo: state.chat.chatChannel,
    friendsState: {
        friendsList: state.friends.friendsList,
        pendingRequests: state.friends.pendingNotifs,
        friendNotifications: state.friends.friendWindowNotifs,
        friendRequests: state.friends.friendRequests
    },
    callState: {
        callInfo: state.chat.callInfo
    }
})

const mapDisp: MapDispatchFn<ChatDispProps> = (dispatch, state) => ({
    showUserMenuFn: () => {
        dispatch(toggleUserMenuAction(true))
    },
    hideUserMenuFn: () => {
        dispatch(toggleUserMenuAction(false))
    },
    logoutFn: async () => {
        const res = await logoutUser()

        if (resHasError(res)) return

        dispatch(removeUserInfoAction())
    },
    dispNotification: pushNotification(dispatch),
    dispatch,
    updateActiveChannelsFn: (channels: ClientActiveChannel[]) => {
        dispatch(updateActiveChannelsAction(channels))
    },
    changeChannelIdFn: (channelId: string) => {
        dispatch(changeChannelIdAction(channelId))
    },
    changeRecipientIdFn: (recipiendId: string) => {
        dispatch(changeCHatRecipientAction(recipiendId))
    },
    updateChannelInfoFn: (channelInfo: ChatChannelState) => {
        dispatch(updateChatChannelAction(channelInfo))
    },
    pushSentMsgToStoreFn: (msg: PendingMsg) => {
        dispatch(sendChatMsgAction(msg))
    },
    markMsgAsFailedFn: (temporaryId: string) => {
        dispatch(changeMsgToFailAction(temporaryId))
    },
    removeChannelFromListFn: (channelId: string) => {
        dispatch(removeActiveChannelAction(channelId))
    },
    appendActiveChannelFn: (channelInfo: ClientActiveChannel) => {
        dispatch(addActiveChannelAction(channelInfo))
    },
    moveActiveChToTopFn: (channelId: string) => {
        dispatch(moveChannelToTopAction(channelId))
    },
    fillFriendRequestsFn: (friendsRequests: FriendRequestsState) => {
        dispatch(fillPendingRequestsAction(friendsRequests))
    },
    removeFriendRequestFn: (index: number) => {
        dispatch(removeFriendRequestAction(index))
    },
    clearFriendButtonNotifFn: () => {
        dispatch(clearFriendsButtonNotifAction())
    },
    clearPendingButtonNotifFn: () => {
        dispatch(clearPendingNotifAmountAction())
    },
    clearActiveChannelNotifFn: (channelId: string) => {
        dispatch(clearActiveChannelNotifAction(channelId))
    },
    fillFriendsListFn: (list: FriendsState['friendsList']) => {
        dispatch(fillFriendsListAction(list))
    },
    removeFriendFromListFn: (friendId: string) => {
        dispatch(removeFriendFromListAction(friendId))
    },
    callFns: {
        removeCallInfoStore: () => {
            dispatch(removeIncCallInfoAction())
        }
    }
})

const ChatApp = connect(mapState, mapDisp)(ChatAppView)

export default ChatApp