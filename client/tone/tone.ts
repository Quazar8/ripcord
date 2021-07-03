import * as Tone from 'tone'

const synth = new Tone.DuoSynth().toDestination()
const reverb = new Tone.Reverb(0.4).toDestination()
synth.connect(reverb)

export const triggerMsgSound = () => {
    synth.volume.value = -12
    const now = Tone.now()
    synth.triggerAttackRelease('A4', '32n', now)
    synth.triggerAttackRelease('D5', '32n', now + 0.15)
}