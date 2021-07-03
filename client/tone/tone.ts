import * as Tone from 'tone'

const synth = new Tone.FMSynth().toDestination()
const reverb = new Tone.Reverb(0.4).toDestination()
synth.connect(reverb)

export const triggerMsgSound = () => {
    synth.volume.value = -5
    synth.triggerAttackRelease('A4', '32n')
}