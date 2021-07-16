import React from 'react'

type Props = {
    answerCall: () => void
}

const AnswerCallButton = (props: Props) => {
    return (
        <button onClick = { props.answerCall } className = "answer-call-button">
            <span>&#128222;</span>
        </button>
    )
}

export default AnswerCallButton
