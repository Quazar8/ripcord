import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LoginForm from './user-forms/LoginForm'
import RegisterForm from './user-forms/RegisterForm'
import HomeScreen from './home/HomeScreen'
import NotFound from './others/NotFound'
import { UserState } from '../store/globalReducer'

type Props = {
    user: UserState
}

const Main = ({ user }: Props) => {
    return (
        <main>
            <HomeScreen user = { user } />
        </main>
    )
}

export default Main