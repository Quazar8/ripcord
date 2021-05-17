import React, { useEffect } from 'react'
import { getActiveChannels } from '../../../api/chatApi'
import { resHasError } from '../../../api/utils'

const ActiveChannels = () => {
    const retrieveChannels = async () => {
        const res = await getActiveChannels()

        if (resHasError(res)) {
            return
        }

        console.log(res.data)
    }

    useEffect(() => {
        retrieveChannels()
    }, [])

    return (
        <div className = "active-channels">
            Active Channels component
        </div>
    )
}

export default ActiveChannels