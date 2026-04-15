import { useEffect } from 'react'

const SESSION_KEY = 'teraby_intro_played'

/**
 * Plays a soft Cmaj7 chord (sine oscillators) once per browser session.
 * Uses Web Audio API entirely — no external files, no network requests.
 * Silently aborts if autoplay is blocked by the browser.
 */
function playLuxuryChord() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return

    const ctx = new Ctx()

    // Master gain — controls the overall envelope (fade in → sustain → fade out)
    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.4)  // gentle fade in
    master.gain.setValueAtTime(0.045, ctx.currentTime + 2.8)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 5.2)      // smooth fade out
    master.connect(ctx.destination)

    // Cmaj7: C4 · E4 · G4 · B4  — warm, open, luxury feel
    const chord = [261.63, 329.63, 392.00, 493.88]

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.value = freq
      // Tiny detune per note adds warmth without beating
      osc.detune.value = (i % 2 === 0 ? 1 : -1) * 3
      // Each note at equal loudness
      oscGain.gain.value = 1 / chord.length

      osc.connect(oscGain)
      oscGain.connect(master)

      // Slight stagger (arpeggio breath) — 60 ms between notes
      const startAt = ctx.currentTime + i * 0.06
      osc.start(startAt)
      osc.stop(ctx.currentTime + 5.8)
    })

    // Release AudioContext after the sound is fully done
    setTimeout(() => ctx.close().catch(() => {}), 6500)
  } catch {
    // Autoplay blocked, no AudioContext support, or any other error — fail silently
  }
}

export default function useIntroAudio() {
  useEffect(() => {
    // Only once per browser session
    if (sessionStorage.getItem(SESSION_KEY)) return

    // Small delay: let the page paint first so audio doesn't race with render
    const timer = setTimeout(() => {
      playLuxuryChord()
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 900)

    return () => clearTimeout(timer)
  }, []) // empty deps — runs once on mount
}
