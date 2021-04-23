import React from 'react'
import NavLinks from './NavLinks'

import { connect, MapStateFn } from '../../store/store'
import { UserState } from '../../store/globalReducer'

type StateProps = {
    user: UserState
}

const NavbarView = ({ user }: StateProps) => {
    if (user.username) return null
    
    return (
        <nav className = "main-navbar">
            <NavLinks user = { user }/>
        </nav>
    )
}

const mapState: MapStateFn<StateProps> = (state) => ({
    user: state.global.user
})

const Navbar = connect(mapState, null)(NavbarView)

export default Navbar