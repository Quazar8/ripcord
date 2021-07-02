import { Synth } from 'tone'

const synth = new Synth().toDestination()

export const triggerMsgSound = () => {
    synth.triggerAttackRelease('D6', '32n')
}