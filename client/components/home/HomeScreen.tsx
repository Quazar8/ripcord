import React from 'react'
import { MapStateFn, connect } from '../../store/store'
import { UserState } from '../../store/globalReducer'

import ChatDisplay from './ChatDisplay'

type StateProps = {
    user: UserState
}

const HomeScreenView = () => {
    return (
        <section className = "home-screen">
            <ChatDisplay />            
        </section>
    )
}

const mapState: MapStateFn<StateProps> = state => ({
    user: state.global.user
})

const HomeScreen = connect(mapState, null)(HomeScreenView)

export default HomeScreen