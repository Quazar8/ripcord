import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LoginForm from './user-forms/LoginForm'
import HomeScreen from './home/HomeScreen'

const Main = () => {
    return (
        <main>
            <Switch>
                <Route path = "/login">
                    <LoginForm />
                </Route>
                <Route path = "/">
                    <HomeScreen />
                </Route>
            </Switch>
        </main>
    )
}

export default Main