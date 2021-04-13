import React, { useRef } from 'react'
import { connect, MapDispatchFn } from '../../store/connect'
import { pushNotification } from '../../store/globalActions'

type DIspProps = {
    pushNotification: ReturnType<typeof pushNotification>
}

const ChatDisplayView = ({ pushNotification }: DIspProps) => {
    const socket = new WebSocket('ws://localhost:8000')
    socket.onopen = (ev) => {
        console.log('socket connection is opened')
    }

    const sendInputRef: React.MutableRefObject<HTMLInputElement> = useRef(null)
    
    const sendMsg = () => {
        socket.send(sendInputRef.current.value)
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