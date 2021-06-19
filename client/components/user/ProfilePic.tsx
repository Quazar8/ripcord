import React from 'react'
import { ProfilePicJson } from '../../../server/types/UserTypes'
import { genProfilePicUrl } from '../../api/userApi'

type Props = {
    picNameOrJson: string | ProfilePicJson
}

const isStrPicName = (arg: string | ProfilePicJson): arg is string => {
    return typeof arg === 'string' && !arg.includes(':')
}

const ProfilePic = ({ picNameOrJson }: Props) => {
    let PicComponent: JSX.Element = null
    if (isStrPicName(picNameOrJson)) {
        PicComponent = <img className ="image" 
            src = { genProfilePicUrl(picNameOrJson) }/>
    } else {
        const style = {
            background: picNameOrJson.background,
            color: picNameOrJson.textColor
        }

        PicComponent = <div
            className = "image"
            style = { style }
        >{ picNameOrJson.letters }</div>
    }

    return (
        <div className = "profile-pic">
            <div className = "image-container">
                { PicComponent }
            </div>
        </div>
    )
}

export default ProfilePic