import React, { Dispatch, useEffect } from 'react'
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
import { Types } from 'mongoose'
import { ActiveChannelInfo } from '../../../server/types/ChatTypes'
import { updateActiveChannelsAction } from '../../store/chat/chatActions'

type ChatStateProps = {
    user: UserState
    showUserMenu: boolean
    showFriendsWindow: boolean,
    friendNotifications: number,
    recipientId: string
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
}

export type ChatAppProps = ChatStateProps & ChatDispProps

const ChatAppView = (props: ChatAppProps) => {
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
                toggleFriendsWindowFn = { props.toggleFriendsWindowFn }
                friendNotifications = { props.friendNotifications }
                updateActiveChannelsFn = { props.updateActiveChannelsFn }
            />
            <RightWindow 
                showFriendsWindow = { props.showFriendsWindow }
                dispNotification = { props.dispNotification }
                showChatDisplayFn = { props.showChatDisplayFn }
                recipientId = { props.recipientId }
                user = { props.user }
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
    recipientId: state.global.chat.recipientId
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
    } 
})

const ChatApp = connect(mapState, mapDisp)(ChatAppView)

export default ChatApp