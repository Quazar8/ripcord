import React from 'react'
import { ChatMenuProps } from './ChatMenu'
import ProfilePic from '../../user/ProfilePic'

type Props = Pick<ChatMenuProps, 'showUserMenuFn'> & {
    username: string,
    profilePic: string
}

const NamePlate = ( props: Props ) => {
    return (
        <div className = "nameplate">
            <div 
                className = "name-container"
                onClick = { props.showUserMenuFn }
            >
                <ProfilePic picNameOrJson = { props.profilePic } />
                { props.username }
            </div>
            <div className = "status-circle"></div>
        </div>
    )
}

export default NamePlate