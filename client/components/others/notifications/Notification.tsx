import React from 'react'

type Props = {
    msg: string,
    type: 'info' | 'success' | 'error'
}

const Notification = ({ msg, type }: Props) => {
    return (
        <div className = "notification">
            Success Notification
        </div>
    )
}

export default Notification