import React from 'react'

type Props = {
    amount: number
}

const NotifAttach = (props: Props) => {
    return (
        <div className = "notification-attachment">
            { props.amount }
        </div>
    )
}

export default NotifAttach
