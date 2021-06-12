import React from 'react'
import Navbar from '../navbar/Navbar'
import RipcordSVG from './RipcordSVG'

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
            <div className = "home-screen-main">
                <div className = "ripcord-svg-container">
                    <RipcordSVG />
                </div>
            </div>
        </section>
    )
}

export default HomeScreen