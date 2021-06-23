import React from 'react'
import { ChatAppProps } from '../chat/ChatApp'

import ProfileWindow from './ProfileWindow'

export type UserMenuProps = Pick<ChatAppProps, 'showUserMenu'
| 'hideUserMenuFn' | 'logoutFn' | 'user'>

const UserMenu = (props: UserMenuProps) => {
    if (!props.showUserMenu) return null

    return (
        <section className = "user-menu">
            <div className = "menu-bar">
                <button onClick = { props.hideUserMenuFn }>X</button>
            </div>
            <div className = "menu-content-container">
                <div className = "buttons-column">
                    <button>Profile</button>
                    <button onClick = { props.logoutFn }>Log out</button>
                </div>
                <div className = "right-container"> 
                    <ProfileWindow user = { props.user }/>
                </div>
            </div>
        </section>
    )
}

export default UserMenu