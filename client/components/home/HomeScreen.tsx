import React from 'react'
import Navbar from '../navbar/Navbar'
import RipcordSVG from './RipcordSVG'
import { Route, Switch } from 'react-router-dom'

import ChatApp from '../chat/ChatApp'
import { UserState } from '../../store/globalReducer'
import RegisterForm from '../user-forms/RegisterForm'
import LoginForm from '../user-forms/LoginForm'
import NotFound from '../others/NotFound'

type Props = {
    user: UserState
}

window.onload = () => {
    const svg = document.getElementsByClassName('ripcord-svg')[0]
    const paths: HTMLCollection = svg.children
    for (let i = 0; i < paths.length; i++) {
        console.log(`${i} is ${paths[i].getTotalLength()}`)
    }
}

const HomeScreen = ({ user }: Props) => {
    if (user.username) return <ChatApp />

    return (
        <section className = "home-screen">
            <Navbar />
            <Switch>
                <Route exact path = "/">
                    <div className = "home-screen-main">
                        <div className = "ripcord-svg-container">
                            <RipcordSVG />
                        </div>
                    </div>
                </Route>
                <Route path = "/login">
                    <LoginForm />
                </Route>
                <Route path = "/register">
                    <RegisterForm />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </section>
    )
}

export default HomeScreen