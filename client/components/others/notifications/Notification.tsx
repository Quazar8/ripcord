import React from 'react'

type Props = {
    msg: string,
    type: 'info' | 'success' | 'error'
}

const Notification = ({ msg, type }: Props) => {
    const className = 'notification ' + type
    const iconChar = (() => {
        switch (type) {
            case 'error': return 'X'
            case 'success': return '\U2713'
            default: return 'I'
        }
    })()

    return (
        <div className = { className }>
            <div className = "message">
                { msg }
            </div>
            <div className = "icon">
                { iconChar }
            </div>
        </div>
    )
}

export default Notification