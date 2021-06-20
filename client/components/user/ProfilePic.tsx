import React from 'react'
import { ProfilePicJson } from '../../../server/types/UserTypes'
import { genProfilePicUrl } from '../../api/userApi'

type Props = {
    picNameOrJson: string
}

const ProfilePic = ({ picNameOrJson }: Props) => {
    let PicComponent: JSX.Element = null

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
                { jsonPic.letters }
            </div>
        )
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