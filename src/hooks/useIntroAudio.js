import { useEffect } from 'react'

const SESSION_KEY = 'teraby_intro_played'
const MUTE_KEY    = 'teraby_audio_muted'
const EVENTS      = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove']

// ─── Module-level shared state ────────────────────────────────────────────────
// Using module scope (not component state) means React Strict Mode's
// setup → cleanup → setup cycle doesn't create duplicate AudioContexts
// or race conditions. Both invocations share these variables.
let _globalCtx = null   // single AudioContext reused across re-invocations
let _playing   = false  // true once audio has been triggered this JS session

// ─── Audio engine ─────────────────────────────────────────────────────────────
function scheduleChord(ctx) {
  const master = ctx.createGain()
  // Volume: silent → fade-in 1.4 s → hold → fade-out — cinematic feel
  master.gain.setValueAtTime(0,     ctx.currentTime)
  master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.4)
  master.gain.setValueAtTime(0.05,  ctx.currentTime + 2.8)
  master.gain.linearRampToValueAtTime(0,    ctx.currentTime + 5.2)
  master.connect(ctx.destination)

  // Cmaj7 — C4 E4 G4 B4, staggered entry for depth
  ;[261.63, 329.63, 392.00, 493.88].forEach((freq, i) => {
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type            = 'sine'
    osc.frequency.value = freq
    osc.detune.value    = (i % 2 === 0 ? 1 : -1) * 3
    gain.gain.value     = 0.25
    osc.connect(gain)
    gain.connect(master)
    osc.start(ctx.currentTime + i * 0.07)
    osc.stop(ctx.currentTime + 6.0)
  })

  setTimeout(() => ctx.close().catch(() => {}), 6800)
}

// Called from both the autoplay path and the interaction path
function tryPlay() {
  if (_playing) return                            // already triggered
  if (sessionStorage.getItem(SESSION_KEY)) return // already played this session

  const ctx = _globalCtx
  if (!ctx || ctx.state === 'closed') return

  _playing = true

  ctx.resume().then(() => {
    scheduleChord(ctx)
    // Mark AFTER successful scheduling — never before
    sessionStorage.setItem(SESSION_KEY, '1')
  }).catch(() => {
    _playing = false  // resume failed; allow retry on next interaction
  })
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export default function useIntroAudio() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    if (localStorage.getItem(MUTE_KEY) === 'true') return

    const AudioCtx = window.AudioContext || /** @type {any} */ (window).webkitAudioContext
    if (!AudioCtx) return

    // Reuse existing context if healthy; create one otherwise
    if (!_globalCtx || _globalCtx.state === 'closed') {
      try { _globalCtx = new AudioCtx() } catch { return }
    }

    // Each effect invocation gets its own onInteraction reference so that
    // cleanup can precisely remove the right listener — no stale closures.
    function onInteraction() {
      removeListeners()
      tryPlay()
    }

    function addListeners() {
      EVENTS.forEach(e => document.addEventListener(e, onInteraction, { passive: true }))
    }

    function removeListeners() {
      EVENTS.forEach(e => document.removeEventListener(e, onInteraction))
    }

    // ── Attempt 1: autoplay ──────────────────────────────────────────────
    // Browsers with high media engagement let ctx transition to 'running'
    // right after resume(). First-time visitors stay 'suspended' → arm.
    _globalCtx.resume().then(() => {
      if (_globalCtx && _globalCtx.state === 'running') {
        tryPlay()         // autoplay succeeded
      } else {
        addListeners()    // blocked — wait for first natural interaction
      }
    }).catch(() => addListeners())

    // ── Dev helper ───────────────────────────────────────────────────────
    if (import.meta.env.DEV) {
      window.resetIntroAudio = () => {
        sessionStorage.removeItem(SESSION_KEY)
        _playing = false
        if (_globalCtx && _globalCtx.state !== 'closed') {
          _globalCtx.close().catch(() => {})
          _globalCtx = null
        }
        console.log('[audio] reset — interact with the page to trigger')
      }
    }

    return () => {
      // Remove this invocation's listeners. If Strict Mode re-runs the effect,
      // the new invocation will re-add fresh listeners on the shared _globalCtx.
      removeListeners()
    }
  }, [])
}

/**
 * Mute toggle helper — import into any component.
 * Returns [isMuted, toggleMute].
 */
export function useAudioMute() {
  const isMuted = localStorage.getItem(MUTE_KEY) === 'true'
  function toggleMute() {
    const next = !isMuted
    localStorage.setItem(MUTE_KEY, String(next))
    return next
  }
  return [isMuted, toggleMute]
}
