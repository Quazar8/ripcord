import React from 'react'
import { UserState } from '../../store/globalReducer'

import DefaultLinks from './DefaultLinks'

type Props = {
    user: UserState
}

const NavLinks = ({ user }: Props) => {
    return (
        <div className = "nav-links-container">
            <DefaultLinks />
        </div>
    )
}

export default NavLinks