import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LoginForm from './user-forms/LoginForm'
import RegisterForm from './user-forms/RegisterForm'
import HomeScreen from './home/HomeScreen'
import NotFound from './others/NotFound'

const Main = () => {
    return (
        <main>
            <Switch>
                <Route path = "/login">
                    <LoginForm />
                </Route>
                <Route path = "/register">
                    <RegisterForm />
                </Route>
                <Route exact path = "/">
                    <HomeScreen />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </main>
    )
}

export default Main