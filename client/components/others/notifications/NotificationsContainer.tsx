import React from 'react'
import { Notification } from '../../../store/globalActions'
import { connect, MapStateFn } from '../../../store/store'
import NotificationComp from './Notification'

type StateProps = {
    notifications: Notification[]
}

const NotificationsContainerView = ({ notifications }: StateProps) => {
    return (
        <section className = "notifications-container">
            {
                notifications.map((n, i) => (
                    <NotificationComp key = { i } { ...n } />
                ))
            }
        </section>
    )
}

const mapState: MapStateFn<StateProps> = (state) => {
    return {
        notifications: state.global.notifications
    }
}


const NotificationsContainer = connect(mapState, null)(NotificationsContainerView)

export default NotificationsContainer