import React from 'react'

type Props = {
    username: string
}

const NamePlate = ( { username }: Props ) => {
    return (
        <div className = "nameplate">
            <div className = "name-container">{ username }</div>
            <div className = "status-circle"></div>
        </div>
    )
}

export default NamePlate