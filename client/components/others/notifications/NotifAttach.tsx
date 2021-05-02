import React from 'react'

type Props = {
    amount: number
}

const NotifAttach = (props: Props) => {
    if (props.amount === 0) return null

    return (
        <div className = "notification-attachment">
            { props.amount }
        </div>
    )
}

export default NotifAttach
