import React, { useEffect } from 'react'
import { getActiveChannels } from '../../../api/chatApi'
import { resHasError } from '../../../api/utils'
import { ChatAppProps } from '../ChatApp'

import ActiveChannelPlate from './ActiveChannelPlate'

type Props = Pick<ChatAppProps, "updateActiveChannelsFn"
| "activeChannels">

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

    if (props.activeChannels.length < 1) {
        return null
    }

    return (
        <div className = "active-channels">
            <h3>Active Channels:</h3>
            {
                props.activeChannels.map((c, i) => (
                    <ActiveChannelPlate
                        key = { i }
                        channel = { c }
                    />
                ))
            }
        </div>
    )
}

export default ActiveChannels