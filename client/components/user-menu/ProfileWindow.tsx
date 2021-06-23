import React from 'react'
import { genProfilePicUrl } from '../../api/userApi'
import { ProfilePicJson } from '../../../server/types/UserTypes'

type Props = {
    picNameOrJson: string
}

const ProfileWindow = (props: Props) => {
    let ProfileImage: JSX.Element = null

    const setProfileImage = (picStr: string) => {
        if (!picStr) return <div className = "image"></div>

        if (picStr.includes(":")) {
            const picJson: ProfilePicJson = JSON.parse(picStr)
            const style = {
                background: picJson.background,
                color: picJson.textColor
            }

            return <div className = "image" style = { style }>
                <span>{ picJson.letters }</span>
            </div>
        }

        return <img className = "image" 
        src = { genProfilePicUrl(picStr) } />
    }

    ProfileImage = setProfileImage(props.picNameOrJson)

    return (
        <div className = "profile-window">
            <div className = "profile-pic">
                { ProfileImage }
            </div>
        </div>
    )
}

export default ProfileWindow