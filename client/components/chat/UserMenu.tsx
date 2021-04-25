import React from 'react'

type Props = {
    showUserMenu: boolean,
    hideUserMenuFn: () => void
}

const UserMenu = ({ showUserMenu, hideUserMenuFn }: Props) => {
    if (!showUserMenu) return null

    return (
        <section className = "user-menu">
            <div className = "menu-bar">
                <button onClick = { hideUserMenuFn }>X</button>
            </div>
            <div className = "menu-content-container">
                <button>Log out</button>
            </div>
        </section>
    )
}

export default UserMenu