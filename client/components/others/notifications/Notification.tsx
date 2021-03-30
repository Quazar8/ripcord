import React, { useState } from 'react'

type Props = {
    msg: string,
    type: 'info' | 'success' | 'error'
}

const Notification = ({ msg, type }: Props) => {
    const [className, setClassName] = useState('notification')
    return (
        <div className = { className }>
            { msg }
        </div>
    )
}

export default Notification