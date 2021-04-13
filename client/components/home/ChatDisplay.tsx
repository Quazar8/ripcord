import React from 'react'
import { connect, MapDispatchFn } from '../../store/connect'
import { pushNotification } from '../../store/globalActions'

type DIspProps = {
    pushNotification: ReturnType<typeof pushNotification>
}

const ChatDisplay = () => {
    return (
        <section className="chat-display">
            <div className="chat-monitor"></div>
            <input placeholder="send a message" type="text" />
            <button>Send</button>
        </section>
    )
}

const mapDispatch: MapDispatchFn<DIspProps> = (dispatch) => ({
    pushNotification: pushNotification(dispatch)
})

export default ChatDisplay