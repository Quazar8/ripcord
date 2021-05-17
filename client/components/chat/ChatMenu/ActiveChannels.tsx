import React, { useEffect } from 'react'
import { getActiveChannels } from '../../../api/chatApi'
import { resHasError } from '../../../api/utils'
import { ChatAppProps } from '../ChatApp'

type Props = Pick<ChatAppProps, "updateActiveChannelsFn">

const ActiveChannels = (props: Props) => {
    const retrieveChannels = async () => {
        const res = await getActiveChannels()

        if (resHasError(res)) {
            return
        }

        props.updateActiveChannelsFn(res.data.activeChannels)
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