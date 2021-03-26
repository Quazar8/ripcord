import React, { useEffect } from 'react'
import { addNotification, Notification } from '../../../store/globalActions'
import { useGlobalReducer } from '../../../store/globalReducer'

const NotificationsContainer = () => {
    const [state, dispatch] = useGlobalReducer()
    
    useEffect(() => {
        const data: Notification = {
            id: Date.now().toString(),
            type: 'info',
            msg: 'Test Notification'
        }

        dispatch(addNotification(data))
        console.log(state.notifications)
    }, [])

    return (
        <section className = "notification-container">
            This is the notification container
        </section>
    )
}

export default NotificationsContainer