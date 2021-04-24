import React from 'react'

type Props = {
    showUserMenu: boolean
}

const UserMenu = ({ showUserMenu }: Props) => {
    if (!showUserMenu) return null

    return (
        <section className = "user-menu">
            <div className = "menu-bar">
                <button>X</button>
            </div>
            User Menu Component
        </section>
    )
}

export default UserMenu