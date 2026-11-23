// Background music, composed here in code: slow four-chord pads, a soft pulse, a sparse pluck.
// No audio file, no third-party track. It only ever starts from a click.
const BPM = 84;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const LOOK_AHEAD = 1.2;
const VOLUME = 0.55;

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
// D major 9, B minor 11, G major 9, A sus: bass first, then the pad.
const CHORDS = [
  { bass: 38, pad: [54, 57, 61, 64], top: [78, 81, 76, 73] },
  { bass: 35, pad: [54, 57, 62, 64], top: [78, 74, 76, 81] },
  { bass: 31, pad: [54, 59, 62, 66], top: [74, 78, 81, 86] },
  { bass: 33, pad: [55, 59, 62, 64], top: [76, 71, 74, 81] },
];
const PLUCKS = [0, 1.5, 2.5, 3.25];

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let echo: GainNode | null = null;
let timer: ReturnType<typeof setInterval> | undefined;
let sleep: ReturnType<typeof setTimeout> | undefined;
let nextBar = 0;
let bar = 0;
let on = false;

function voice(type: OscillatorType, freq: number, at: number, peak: number, attack: number, length: number, out: AudioNode) {
  const osc = ctx!.createOscillator();
  const gain = ctx!.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(peak, at + attack);
  gain.gain.setTargetAtTime(0, at + attack, Math.max(0.03, (length - attack) / 4));
  osc.connect(gain).connect(out);
  osc.start(at);
  osc.stop(at + length + 0.5);
  osc.onended = () => gain.disconnect();
  return osc;
}

function schedule(at: number) {
  const chord = CHORDS[bar % CHORDS.length];
  const out = master!;
  chord.pad.forEach((n, i) => {
    voice('sine', hz(n), at, 0.075, 1.1, BAR + 1.2, out).detune.value = i % 2 ? 4 : -4;
    voice('triangle', hz(n), at, 0.025, 1.4, BAR + 0.8, out).detune.value = i % 2 ? -6 : 6;
  });
  voice('sine', hz(chord.bass + 12), at, 0.16, 0.08, BAR, out);
  // Two bars of air, then the pulse and the plucks come in.
  if (bar >= 2) {
    for (let beat = 0; beat < 4; beat += 2) {
      const t = at + beat * BEAT;
      const kick = voice('sine', 110, t, 0.2, 0.006, 0.3, out);
      kick.frequency.exponentialRampToValueAtTime(48, t + 0.14);
    }
  }
  if (bar >= 1) {
    PLUCKS.forEach((b, i) => {
      const note = hz(chord.top[(i + bar) % chord.top.length]);
      voice('triangle', note, at + b * BEAT, 0.045, 0.008, 0.8, out);
      voice('sine', note, at + b * BEAT, 0.03, 0.008, 0.6, echo!);
    });
  }
  bar += 1;
}

function tick() {
  if (!ctx) return;
  if (nextBar < ctx.currentTime) nextBar = ctx.currentTime + 0.05;
  while (nextBar < ctx.currentTime + LOOK_AHEAD) {
    schedule(nextBar);
    nextBar += BAR;
  }
}

function build() {
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0;
  const warm = ctx.createBiquadFilter();
  warm.type = 'lowpass';
  warm.frequency.value = 4200;
  const limit = ctx.createDynamicsCompressor();
  limit.threshold.value = -14;
  master.connect(warm).connect(limit).connect(ctx.destination);

  echo = ctx.createGain();
  const delay = ctx.createDelay(1);
  delay.delayTime.value = BEAT * 0.75;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.36;
  echo.connect(delay);
  delay.connect(feedback).connect(delay);
  delay.connect(master);

  document.addEventListener('visibilitychange', () => {
    if (!on || !ctx) return;
    if (document.hidden) ctx.suspend();
    else ctx.resume();
  });
}

function reflect() {
  document.documentElement.dataset.sound = on ? 'on' : 'off';
  document.querySelectorAll('[data-tool="sound"]').forEach((b) => b.setAttribute('aria-pressed', String(on)));
}

/** Call from a click. Resolves false where audio is blocked or missing. */
export async function playMusic() {
  try {
    if (!ctx) build();
    clearTimeout(sleep);
    on = true;
    await ctx!.resume();
    if (!on) return false;
    master!.gain.cancelScheduledValues(ctx!.currentTime);
    master!.gain.setTargetAtTime(VOLUME, ctx!.currentTime, 0.5);
    tick();
    clearInterval(timer);
    timer = setInterval(tick, 300);
  } catch {
    on = false;
  }
  reflect();
  return on;
}

export function stopMusic() {
  if (!ctx || !master) return;
  on = false;
  reflect();
  clearInterval(timer);
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
  sleep = setTimeout(() => { if (!on) ctx?.suspend(); }, 900);
}

export const toggleMusic = () => {
  if (on) {
    stopMusic();
    return Promise.resolve(false);
  }
  return playMusic();
};
