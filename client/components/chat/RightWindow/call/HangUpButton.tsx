import React from 'react'

type Props = {
    hangUpCall: () => void
}

const HangUpButton = (props: Props) => {
    return (
        <button onClick = { props.hangUpCall } className = "hang-up-button">
            <span>&#128222;</span>
        </button>
    )
}

export default HangUpButton