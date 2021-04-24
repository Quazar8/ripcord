import React from 'react'

type Props = {
    username: string,
    showUserMenuFn: () => void
}

const NamePlate = ( { username, showUserMenuFn }: Props ) => {
    return (
        <div className = "nameplate">
            <div 
                className = "name-container"
                onClick = { showUserMenuFn }
            >
                { username }
            </div>
            <div className = "status-circle"></div>
        </div>
    )
}

export default NamePlate