import * as Tone from 'tone'

const messageSignalInit = () => {
    const synth = new Tone.DuoSynth().toDestination()
    const reverb = new Tone.Reverb(0.4).toDestination()
    synth.connect(reverb)
    synth.volume.value = -12

    const play = () => {
        const now = Tone.now()
        synth.triggerAttackRelease('A4', '32n', now)
        synth.triggerAttackRelease('D5', '32n', now + 0.15)
    }

    return {
        play
    }
}

const friendReqSignalInit = () => {
    const synth = new Tone.Synth().toDestination()
    const reverb = new Tone.Reverb(0.4).toDestination()
    synth.connect(reverb)
    synth.volume.value = -8

    const play = () => {
        const now = Tone.now()
        synth.triggerAttackRelease('B4', '8n', now)
        synth.triggerAttackRelease('G4', '8n', now + 0.35)
    }

    return {
        play
    }
}

const messageSignal = messageSignalInit()
const friendReqSignal = friendReqSignalInit()

export const triggerMsgSound = () => {
    messageSignal.play()
}

export const triggerFrReqSound = () => {
    friendReqSignal.play()
}