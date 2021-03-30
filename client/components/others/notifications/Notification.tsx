import React from 'react'

type Props = {
    msg: string,
    type: 'info' | 'success' | 'error'
}

const Notification = ({ msg, type }: Props) => {
    const className = 'notification ' + type
    return (
        <div className = { className }>
            { msg }
        </div>
    )
}

export default Notification