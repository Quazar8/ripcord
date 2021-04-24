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
            User Menu Component
        </section>
    )
}

export default UserMenu