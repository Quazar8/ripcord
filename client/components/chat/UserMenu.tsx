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
                <div className = "buttons-column">
                    <button onClick = { props.logoutFn }>Log out</button>
                </div>
                <div className = "right-container">
                    Right Container
                </div>
            </div>
        </section>
    )
}

export default UserMenu