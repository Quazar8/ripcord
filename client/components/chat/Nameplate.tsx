import React from 'react'

type Props = {
    username: string
}

const NamePlate = ( { username }: Props ) => {
    return (
        <div className = "nameplate">
            { username }
        </div>
    )
}

export default NamePlate