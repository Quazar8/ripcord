import React from 'react'
import { addNotification, Notification } from '../../../store/globalActions'
import { connect, MapStateFn, MapDispatchFn } from '../../../store/connect'
import NotificationComp from './Notification'

type StateProps = {
    notifications: Notification[]
}

type DispProps = {
    pushNotification: (type: Notification['type'], msg: Notification['msg']) => void
}

type Props = StateProps & DispProps

const NotificationsContainerView = ({ notifications, pushNotification }: Props) => {
    const appendNotification = () => {
        pushNotification('info', 'test notification')
    }

    return (
        <section className = "notification-container">
            {
                notifications.map((n, i) => (
                    <NotificationComp key = { i } { ...n } />
                ))
            }
            <button onClick = { appendNotification }>Add Notification</button>
        </section>
    )
}

const mapState: MapStateFn = (state): StateProps => {
    return {
        notifications: state.global.notifications
    }
}

const mapDispatch: MapDispatchFn = (dispatch): DispProps => {
    return {
        pushNotification: (type, msg) => {
            dispatch(addNotification(type, msg))
        }
    }
}

const NotificationsContainer = connect(mapState, mapDispatch)(NotificationsContainerView)

export default NotificationsContainer