import React from 'react'
import { ProfilePicJson, UserStatus } from '../../../server/types/UserTypes'
import { genProfilePicUrl } from '../../api/userApi'
import StatusIcon from './StatusIcon'

type Props = {
    picNameOrJson: string
    onlineStatus?: UserStatus
}

const ProfilePic = ({ picNameOrJson, onlineStatus }: Props) => {
    let PicComponent: JSX.Element = null
    if (!picNameOrJson) return null

    const isStrPicName = (candidate: string) => {

        return !candidate.includes(':')
    }

    if (isStrPicName(picNameOrJson)) {
        PicComponent = <img className ="image" 
            src = { genProfilePicUrl(picNameOrJson) }/>
    } else {
        const jsonPic: ProfilePicJson = JSON.parse(picNameOrJson)
        
        const style = {
            background: jsonPic.background,
            color: jsonPic.textColor
        }

        PicComponent = (
            <div className = "image" style = { style }>
                <span>{ jsonPic.letters }</span>
            </div>
        )
    }

    return (
        <div className = "profile-pic">
            <div className = "image-container">
                { PicComponent }
            </div>
            <StatusIcon onlineStatus = { onlineStatus }/>
        </div>
    )
}

export default ProfilePic