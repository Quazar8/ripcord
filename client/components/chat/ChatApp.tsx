import React from 'react'
import { UserState } from '../../store/globalReducer'
import { connect, MapStateFn } from '../../store/store'

import ChatDisplay from './ChatDisplay'
import ChatMenu from './ChatMenu'

type StateProps = {
    user: UserState
}

const ChatAppView = ({ user }: StateProps) => {
    return (
        <section className = "chat-app">
            <ChatMenu user = { user } />
            <ChatDisplay />
        </section>
    )
}

const mapState: MapStateFn<StateProps> = (state) => ({
    user: state.global.user
})

const ChatApp = connect(mapState, null)(ChatAppView)

export default ChatApp