import React, { ChangeEvent, useRef, useEffect, useState, FormEvent, MouseEvent, DragEvent } from 'react'
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
    const [profileLabelClass, setProfileLabelClass] = useState<string>('')

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

    const removeDragOverStyle = () => {
        setProfileLabelClass('')
    }

    const setChosenProfileImage = (file: File) => {
        const imgOnload = () => {
            URL.revokeObjectURL(profileImgRef.current.src)
            setShowSavePicBttn(true)
        }

        const img = <img className = "image"
            src = { URL.createObjectURL(file) }
            ref = { profileImgRef }
            onLoad = { imgOnload }
        />

        setProfilePicComp(img)
        removeDragOverStyle()
    }

    const profilePicChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        profileFileRef.current = ev.target.files[0]
        setChosenProfileImage(ev.target.files[0])
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

    const handleProfileDragOver = (ev: MouseEvent) => {
        ev.preventDefault()
        setProfileLabelClass('dragged-over')
    }

    const handleProfileMouseDrop = (ev: DragEvent) => {
        ev.preventDefault()

        if (ev.dataTransfer.files[0]) {
            profileFileRef.current = ev.dataTransfer.files[0]
            setChosenProfileImage(ev.dataTransfer.files[0])
        }
    }

    useEffect(() => {
        setProfilePicComp(getProfileImage(props.user.profilePic))
    }, [])

    useEffect(() => {
        console.log(profileLabelClass)
    })

    return (
        <div className = "profile-window">
            <form onSubmit = { handleProfilePicSubmit } className = "profile-pic">
                <label htmlFor = "profile-pic-input" 
                    onDragLeave = { removeDragOverStyle }
                    onDragOver = { handleProfileDragOver }
                    onDrop = { handleProfileMouseDrop }
                    className = { profileLabelClass }
                >
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