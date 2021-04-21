import React from 'react'
import { UserState } from '../../store/globalReducer'

import DefaultLinks from './DefaultLinks'
import LoggedLinks from './LoggedLinks'

type Props = {
    user: UserState
}

const NavLinks = ({ user }: Props) => {
    return (
        <div className = "nav-links-container">
            {
                user.username
                ? <LoggedLinks />
                : <DefaultLinks />
            }
        </div>
    )
}

export default NavLinks