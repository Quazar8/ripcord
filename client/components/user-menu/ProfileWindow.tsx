import React, { ChangeEvent, useRef, useEffect, useState, FormEvent } from 'react'
import { genProfilePicUrl, submitNewProfilePic } from '../../api/userApi'
import { ProfilePicJson } from '../../../server/types/UserTypes'
import { UserMenuProps } from './UserMenu'
import { resHasError } from '../../api/utils'

type Props = Pick<UserMenuProps, 'user'>

const ProfileWindow = (props: Props) => {
    const profileInputRef = useRef<HTMLInputElement>()
    const profileImgRef = useRef<HTMLImageElement>()
    const profileFileRef = useRef<File>()

    const [ProfilePicComp, setProfilePicComp] = useState<JSX.Element>(null)
    const [showSavePicBttn, setShowSavePicBttn] = useState<boolean>(false)

    const getProfileImage = (picStr: string) => {
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

    const profilePicChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const imgOnload = () => {
            URL.revokeObjectURL(profileImgRef.current.src)
            setShowSavePicBttn(true)
        }

        const img = <img className = "image" 
            src = { URL.createObjectURL(ev.target.files[0]) }
            ref = { profileImgRef }
            onLoad = { imgOnload }
        />

        profileFileRef.current = ev.target.files[0]

        setProfilePicComp(img)
    }

    const handleProfilePicSubmit = async (ev: FormEvent) => {
        ev.preventDefault()

        if (!profileFileRef.current) return

        const data = {
            profilePic: profileFileRef.current
        }

        const res = await submitNewProfilePic(data)

        if (resHasError(res)) {
            console.log('Error uploading profile pic')
            return
        }

        setShowSavePicBttn(false)
    }

    useEffect(() => {
        setProfilePicComp(getProfileImage(props.user.profilePic))
    }, [])

    return (
        <div className = "profile-window">
            <form onSubmit = { handleProfilePicSubmit } className = "profile-pic">
                <label htmlFor = "profile-pic-input">
                    { ProfilePicComp }
                </label>
                <input onChange = { profilePicChangeHandler }
                    ref = { profileInputRef }
                    id = "profile-pic-input" type = "file" 
                />
                {
                    showSavePicBttn
                    ? <input type = "submit" value = "Save picture" />
                    : null
                }
            </form>
            <div className = "user-info">
                <h2>{props.user.username}</h2>
            </div>
        </div>
    )
}

export default ProfileWindow