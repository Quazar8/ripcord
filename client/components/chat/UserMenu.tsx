import React from 'react'

type Props = {
    showUserMenu: boolean,
    hideUserMenuFn: () => void,
    logoutFn: () => void
}

const UserMenu = (props: Props) => {
    if (!props.showUserMenu) return null

    return (
        <section className = "user-menu">
            <div className = "menu-bar">
                <button onClick = { props.hideUserMenuFn }>X</button>
            </div>
            <div className = "menu-content-container">
                <button onClick = { props.logoutFn }>Log out</button>
            </div>
        </section>
    )
}

export default UserMenu