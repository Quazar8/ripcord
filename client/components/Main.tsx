import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LoginForm from './user-forms/LoginForm'

const Main = () => {
    return (
        <main>
            <Switch>
                <Route path = "/login">
                    <LoginForm />
                </Route>
            </Switch>
        </main>
    )
}

export default Main