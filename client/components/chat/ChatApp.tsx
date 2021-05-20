import React, { Dispatch, useEffect, useState } from 'react'
import { establishWS, socket } from '../../socket/socket'
import { UserState } from '../../store/globalReducer'
import { AppAction, connect, MapDispatchFn, MapStateFn } from '../../store/store'
import { logoutUser } from '../../api/userApi'
import { resHasError } from '../../api/utils'
import { toggleUserMenuAction, 
         removeUserInfoAction, 
         toggleFriendsWindow,
         pushNotification,
         showChatDisplayAction} from '../../store/globalActions'

import RightWindow from './RightWindow'
import ChatMenu from './ChatMenu'
import UserMenu from './UserMenu'
import { ActiveChannelInfo } from '../../../server/types/ChatTypes'
import { changeChannelIdAction, changeCHatRecipientAction, updateActiveChannelsAction } from '../../store/chat/chatActions'

type ChatStateProps = {
    user: UserState
    showUserMenu: boolean
    showFriendsWindow: boolean
    friendNotifications: number
    recipientId: string
    channelId: string
    activeChannels: ActiveChannelInfo[]
}

type ChatDispProps = {
    showUserMenuFn: () => void
    hideUserMenuFn: () => void
    toggleFriendsWindowFn: () => void
    logoutFn: () => void
    dispNotification: ReturnType<typeof pushNotification>,
    dispatch: Dispatch<AppAction>,
    showChatDisplayFn: (recipientId: string) => void
    updateActiveChannelsFn: (channels: ActiveChannelInfo[]) => void
    changeChannelIdFn: (channelId: string) => void
    changeRecipientIdFn: (recipientId: string) => void
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
                changeChannelIdFn = { props.changeChannelIdFn }
                toggleChatWChannelId = { toggleChatWChannelId }
            />
            <RightWindow 
                showFriendsWindow = { showWindows.FriendsWindow }
                dispNotification = { props.dispNotification }
                showChatDisplayFn = { props.showChatDisplayFn }
                recipientId = { props.recipientId }
                user = { props.user }
                channelId = { props.channelId }
                toggleChatWRecipientId = { toggleChatWRecipientId }
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
    showFriendsWindow: state.global.showFriendsWindow,
    friendNotifications: state.global.friendNotifications,
    recipientId: state.chat.currentRecipientId,
    activeChannels: state.chat.activeChannels,
    channelId: state.chat.currentChannelId
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
    toggleFriendsWindowFn: () => {
        dispatch(toggleFriendsWindow(!state.global.showFriendsWindow))
    },
    dispNotification: pushNotification(dispatch),
    dispatch,
    showChatDisplayFn: (recipientId: string) => {
        dispatch(showChatDisplayAction(recipientId))
    }, 
    updateActiveChannelsFn: (channels: ActiveChannelInfo[]) => {
        dispatch(updateActiveChannelsAction(channels))
    },
    changeChannelIdFn: (channelId: string) => {
        dispatch(changeChannelIdAction(channelId))
    },
    changeRecipientIdFn: (recipiendId: string) => {
        dispatch(changeCHatRecipientAction(recipiendId))
    }
})

const ChatApp = connect(mapState, mapDisp)(ChatAppView)

export default ChatApp