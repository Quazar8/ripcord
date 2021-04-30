import React, { useRef, useEffect } from 'react'
import { connect, MapDispatchFn } from '../../store/store'
import { pushNotification } from '../../store/globalActions'

type DIspProps = {
    pushNotification: ReturnType<typeof pushNotification>
}

const ChatDisplayView = ({ pushNotification }: DIspProps) => {
    const sendInputRef = useRef<HTMLInputElement>(null)
    
    const sendMsg = () => {
        // const msg = sendInputRef.current.value
        // if (socket?.readyState === 1 && msg) {
        //     socket?.send(msg)
        // }
        
        pushNotification('info', 'Not implemented yet')
    }

    return (
        <section className = "chat-display">
            <div className = "chat-monitor"></div>
            <input ref = { sendInputRef } placeholder = "send a message" type = "text" />
            <button onClick = { sendMsg } >Send</button>
        </section>
    )
}

const mapDispatch: MapDispatchFn<DIspProps> = (dispatch) => ({
    pushNotification: pushNotification(dispatch)
})

const ChatDisplay = connect(null, mapDispatch)(ChatDisplayView)

export default ChatDisplay