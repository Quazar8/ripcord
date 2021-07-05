import React from 'react'
import { UserStatus } from '../../../server/types/UserTypes'

type Props = {
    onlineStatus?: UserStatus
}

const StatusIcon = ({ onlineStatus }: Props) => {
    if (!onlineStatus) return null
    
    const getAuxClass = (status: UserStatus) => {
        switch(status) {
            case UserStatus.Online: return 'online'
            default: return 'offline'
        }
    }

    return (
        <div className= {"status-icon" + " " + getAuxClass(onlineStatus)}>
        </div>
    )
}

export default StatusIcon