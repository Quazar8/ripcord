import React from 'react'

type Props = {
    hangUpCallFn: () => void
}

const HangUpButton = (props: Props) => {
    return (
        <button onClick = { props.hangUpCallFn } className = "hang-up-button">
            <span>&#128222;</span>
        </button>
    )
}

export default HangUpButton