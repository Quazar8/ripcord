import React, { Dispatch, useEffect, useState } from 'react'
import { establishWS, socket } from '../../socket/socket'
import { UserState } from '../../store/globalReducer'
import { AppAction, connect, MapDispatchFn, MapStateFn } from '../../store/store'
import { logoutUser } from '../../api/userApi'
import { resHasError } from '../../api/utils'
import { toggleUserMenuAction, 
         removeUserInfoAction, 
         pushNotification, 
         clearFriendNotificationAction} from '../../store/globalActions'

import RightWindow from './RightWindow'
import ChatMenu from './ChatMenu'
import UserMenu from './UserMenu'
import { ActiveChannelInfo } from '../../../server/types/ChatTypes'
import { addActiveChannelAction, changeChannelIdAction,
         changeCHatRecipientAction,
         changeMsgToFailAction,
         moveChannelToTopAction,
         removeActiveChannelAction,
         sendChatMsgAction,
         updateActiveChannelsAction,
         updateChatChannelAction } from '../../store/chat/chatActions'
import { ChatChannelState } from '../../store/chat/chatReducer'
import { PendingMsg } from '../../types/ChatClientTypes'
import { FriendRequestsState } from '../../store/friends/friendsReducer'
import { fillPendingRequestsAction, removeFriendRequestAction } from '../../store/friends/friendsActions'

type ChatStateProps = {
    user: UserState
    showUserMenu: boolean
    friendNotifications: number
    pendingRequests: number
    recipientId: string
    channelId: string
    activeChannels: ActiveChannelInfo[]
    channelInfo: ChatChannelState
    friendRequests: FriendRequestsState
}

type ChatDispProps = {
    showUserMenuFn: () => void
    hideUserMenuFn: () => void
    logoutFn: () => void
    dispNotification: ReturnType<typeof pushNotification>,
    dispatch: Dispatch<AppAction>,
    updateActiveChannelsFn: (channels: ActiveChannelInfo[]) => void
    changeChannelIdFn: (channelId: string) => void
    changeRecipientIdFn: (recipientId: string) => void
    updateChannelInfoFn: (channelInfo: ChatChannelState) => void
    pushSentMsgToStoreFn: (msg: PendingMsg) => void
    markMsgAsFailedFn: (temporaryId: string) => void
    removeChannelFromListFn: (channelId: string) => void
    appendActiveChannelFn: (channelInfo: ActiveChannelInfo) => void
    moveActiveChToTopFn: (channelId: string) => void
    fillFriendRequestsFn: (friendRequests: FriendRequestsState) => void
    removeFriendRequestFn: (index: number) => void
    clearFriendButtonNotifFn: () => void
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
            socket.close()
        }
    }, [])

    return (
        <section className = "chat-app">
            <ChatMenu 
                user = { props.user }
                showUserMenuFn = { props.showUserMenuFn }
                toggleFriendsWindowFn = { toggleFriendsWindow }
                friendNotifications = { props.friendNotifications }
                updateActiveChannelsFn = { props.updateActiveChannelsFn }
                activeChannels = { props.activeChannels }
                toggleChatWChannelId = { toggleChatWChannelId }
                removeChannelFromListFn = { props.removeChannelFromListFn}
                clearFriendButtonNotifFn = { props.clearFriendButtonNotifFn }
            />
            <RightWindow 
                showFriendsWindow = { showWindows.FriendsWindow }
                dispNotification = { props.dispNotification }
                recipientId = { props.recipientId }
                user = { props.user }
                friendRequests = { props.friendRequests }
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
                pendingRequests = { props.pendingRequests }
            />
            <UserMenu 
                showUserMenu = { props.showUserMenu }
                hideUserMenuFn = { props.hideUserMenuFn }
                logoutFn = { props.logoutFn }
            />
        </section>
    )
}

const mapState: MapStateFn<ChatStateProps> = (state) => ({
    user: state.global.user,
    showUserMenu: state.global.showUserOptions,
    friendNotifications: state.friends.friendWindowNotifs,
    recipientId: state.chat.currentRecipientId,
    activeChannels: state.chat.activeChannels,
    channelId: state.chat.currentChannelId,
    channelInfo: state.chat.chatChannel,
    friendRequests: state.friends.friendRequests,
    pendingRequests: state.friends.pendingNotifs
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
    updateActiveChannelsFn: (channels: ActiveChannelInfo[]) => {
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
    appendActiveChannelFn: (channelInfo: ActiveChannelInfo) => {
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
        dispatch(clearFriendNotificationAction())
    }
})

const ChatApp = connect(mapState, mapDisp)(ChatAppView)

export default ChatApp