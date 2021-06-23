import React from 'react'
import { ChatAppProps } from '../chat/ChatApp'

import ProfileWindow from './ProfileWindow'

type Props = Pick<ChatAppProps, 'showUserMenu'
| 'hideUserMenuFn' | 'logoutFn'> & {
    profilePic: string
}

const UserMenu = (props: Props) => {
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
                    <ProfileWindow picNameOrJson = { props.profilePic }/>
                </div>
            </div>
        </section>
    )
}

export default UserMenu