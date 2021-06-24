import React from 'react'
import { genProfilePicUrl } from '../../api/userApi'
import { ProfilePicJson } from '../../../server/types/UserTypes'
import { UserMenuProps } from './UserMenu'

type Props = Pick<UserMenuProps, 'user'>

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

    ProfileImage = setProfileImage(props.user.profilePic)

    return (
        <div className = "profile-window">
            <form className = "profile-pic">
                <label htmlFor = "profile-pic-input">
                    { ProfileImage }
                </label>
                <input id = "profile-pic-input" type = "file" />
            </form>
            <div className = "user-info">
                <h2>{props.user.username}</h2>
            </div>
        </div>
    )
}

export default ProfileWindow