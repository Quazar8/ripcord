import React from 'react'

type Props = {
    removeCallInfoStore: () => void
}

const HangUpButton = (props: Props) => {
    return (
        <button onClick = { props.removeCallInfoStore } className = "hang-up-button">
            <span>&#128222;</span>
        </button>
    )
}

export default HangUpButton