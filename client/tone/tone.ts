import { Synth } from 'tone'

const synth = new Synth().toDestination()

export const triggerMsgSound = () => {
    synth.volume.value = -3
    synth.triggerAttackRelease('D6', '32n')
}