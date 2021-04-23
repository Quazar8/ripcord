import React from 'react'

import { logoutUser } from '../../api/userApi'
import { connect, MapDispatchFn } from '../../store/store'
import { removeUserInfoAction } from '../../store/globalActions'

type DispProps = {
    removeUserFromState: () => void
}

const LoggedLinksView = ({ removeUserFromState }: DispProps) => {
    const logoutHandler = async () => {
        const res = await logoutUser()
        
        if (res.error) {
            return
        }

        removeUserFromState()
    }

    return (
        <div className = "logged-links-container">
            <button className = "link-button" onClick = { logoutHandler }>Log out</button>
        </div>
    )
}

const mapDisp: MapDispatchFn<DispProps> = (dispatch) => ({
    removeUserFromState: () => {
        dispatch(removeUserInfoAction())
    }
})

const LoggedLinks = connect(null, mapDisp)(LoggedLinksView)

export default LoggedLinks