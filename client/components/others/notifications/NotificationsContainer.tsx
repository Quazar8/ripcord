import React from 'react'
import { addNotification, Notification } from '../../../store/globalActions'
import { connect, MapStateFn, MapDispatchFn } from '../../../store/connect'

type Props = {
    notifications: Notification[],
    pushNotification: (data: Notification) => void
}

const NotificationsContainerView = ({ notifications, pushNotification }: Props) => {
    const appendNotification = () => {
        pushNotification({
            id: '' + Date.now(),
            msg: 'test notification',
            type: 'info'
        })
    }

    return (
        <section className = "notification-container">
            {
                notifications.map((n, i) => (
                    <h3 key = { i }>{ n.msg + ' ' + i }</h3>
                ))
            }
            <button onClick = { appendNotification }>Add Notification</button>
        </section>
    )
}

const mapState: MapStateFn = state => {
    return {
        notifications: state.global.notifications
    }
}

const mapDispath: MapDispatchFn = dispatch => {
    return {
        pushNotification: (data: Notification) => {
            dispatch(addNotification(data))
        }
    }
}

const NotificationsContainer = connect(mapState, mapDispath)(NotificationsContainerView)

export default NotificationsContainer