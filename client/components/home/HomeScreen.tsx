import React from 'react'
import { MapStateFn, connect } from '../../store/store'
import { UserState } from '../../store/globalReducer'

import ChatDisplay from './ChatDisplay'

type StateProps = {
    user: UserState
}

const HomeScreenView = ({ user }: StateProps) => {
    return (
        <section className = "home-screen">
            {
                user.username
                ? <ChatDisplay />
                : <h2>You need to be logged to chat</h2>
            }
        </section>
    )
}

const mapState: MapStateFn<StateProps> = state => ({
    user: state.global.user
})

const HomeScreen = connect(mapState, null)(HomeScreenView)

export default HomeScreen