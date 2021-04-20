import React from 'react'
import NavLinks from './NavLinks'

import { connect, MapStateFn } from '../../store/store'
import { UserState } from '../../store/globalReducer'

type StateProps = {
    user: UserState
}

const NavbarView = () => {
    return (
        <nav className = "main-navbar">
            <NavLinks />
        </nav>
    )
}

const mapState: MapStateFn<StateProps> = (state) => ({
    user: state.global.user
})

const Navbar = connect(mapState, null)(NavbarView)

export default Navbar