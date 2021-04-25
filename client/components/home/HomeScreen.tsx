import React from 'react'
import Navbar from '../navbar/Navbar'

import ChatApp from '../chat/ChatApp'
import { UserState } from '../../store/globalReducer'

type Props = {
    user: UserState
}

const HomeScreen = ({ user }: Props) => {
    if (user.username) return <ChatApp />

    return (
        <section className = "home-screen">
            <Navbar />
            <h2> You need to be logged in to chat</h2>
        </section>
    )
}

export default HomeScreen