let yeaaapAudio: HTMLAudioElement | null = null;
let audioContext: AudioContext | null = null;

export function playYeaaap({ pitch = 1 }: { pitch?: number } = {}) {
  yeaaapAudio ??= new Audio("/audio/yeaaap.mp3");
  const audio = yeaaapAudio.paused ? yeaaapAudio : new Audio(yeaaapAudio.src);
  audio.currentTime = 0;
  audio.playbackRate = pitch;
  audio.preservesPitch = false;
  void audio.play().catch(() => {});
}

export function randomPitch() {
  return 0.55 + Math.random() * 1.2;
}

function getContext() {
  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") void audioContext.resume();
  return audioContext;
}

const E2 = 82.41;
const POWER_CHORD = [E2, E2 * 1.5, E2 * 2];

function pluck(ctx: AudioContext, frequency: number, seconds: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const period = Math.max(2, Math.round(ctx.sampleRate / frequency));
  for (let i = 0; i < period && i < length; i++) data[i] = Math.random() * 2 - 1;
  for (let i = period; i < length; i++) {
    data[i] = 0.4985 * (data[i - period] + data[i - period + 1]);
  }
  return buffer;
}

function distortionCurve(drive: number) {
  const curve = new Float32Array(2048);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / curve.length) * 2 - 1;
    curve[i] = ((1 + drive) * x) / (1 + drive * Math.abs(x));
  }
  return curve;
}

function amp(ctx: AudioContext, { drive = 60, volume = 0.22 } = {}) {
  const input = ctx.createGain();
  input.gain.value = 3;
  const shaper = ctx.createWaveShaper();
  shaper.curve = distortionCurve(drive);
  shaper.oversample = "4x";
  const lowCut = ctx.createBiquadFilter();
  lowCut.type = "highpass";
  lowCut.frequency.value = 80;
  const mids = ctx.createBiquadFilter();
  mids.type = "peaking";
  mids.frequency.value = 750;
  mids.Q.value = 0.8;
  mids.gain.value = 5;
  const cabinet = ctx.createBiquadFilter();
  cabinet.type = "lowpass";
  cabinet.frequency.value = 3200;
  cabinet.Q.value = 0.9;
  const output = ctx.createGain();
  output.gain.value = volume;
  input.connect(shaper).connect(lowCut).connect(mids).connect(cabinet).connect(output).connect(ctx.destination);
  return { input, output };
}

function strum(ctx: AudioContext, destination: AudioNode, start: number, seconds: number) {
  POWER_CHORD.forEach((frequency, i) => {
    const source = ctx.createBufferSource();
    source.buffer = pluck(ctx, frequency, seconds);
    source.connect(destination);
    source.start(start + i * 0.018);
  });
}

export function playPowerChord(seconds = 1.8) {
  const ctx = getContext();
  const { input, output } = amp(ctx);
  const now = ctx.currentTime;
  strum(ctx, input, now, seconds);
  output.gain.setValueAtTime(0.22, now + seconds - 0.3);
  output.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
}

export function playFeedbackScreech(seconds = 3.2) {
  const ctx = getContext();
  const { input, output } = amp(ctx, { drive: 120 });
  const now = ctx.currentTime;
  strum(ctx, input, now, seconds);

  const feedback = ctx.createOscillator();
  feedback.type = "triangle";
  feedback.frequency.setValueAtTime(E2 * 4, now);
  feedback.frequency.setValueAtTime(E2 * 6, now + 1.6);

  const vibrato = ctx.createOscillator();
  vibrato.frequency.value = 5.5;
  const vibratoDepth = ctx.createGain();
  vibratoDepth.gain.setValueAtTime(0, now);
  vibratoDepth.gain.linearRampToValueAtTime(5, now + seconds);
  vibrato.connect(vibratoDepth).connect(feedback.frequency);

  const swell = ctx.createGain();
  swell.gain.setValueAtTime(0.0001, now);
  swell.gain.setValueAtTime(0.0001, now + 0.4);
  swell.gain.exponentialRampToValueAtTime(0.35, now + 1.4);
  swell.gain.exponentialRampToValueAtTime(0.12, now + 1.6);
  swell.gain.exponentialRampToValueAtTime(0.45, now + 2.4);
  feedback.connect(swell).connect(input);

  output.gain.setValueAtTime(0.22, now + seconds - 0.25);
  output.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  for (const osc of [feedback, vibrato]) {
    osc.start(now);
    osc.stop(now + seconds);
  }
}

export function playBassDrop() {
  const ctx = getContext();
  const { input, output } = amp(ctx, { drive: 8, volume: 0.5 });
  const now = ctx.currentTime;
  const source = ctx.createBufferSource();
  source.buffer = pluck(ctx, E2 / 2, 2.5);
  source.playbackRate.setValueAtTime(1, now + 0.3);
  source.playbackRate.exponentialRampToValueAtTime(0.5, now + 2.2);
  source.connect(input);
  source.start(now);
  output.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
}

export function playDrumFill(hits: number[]) {
  const ctx = getContext();
  const now = ctx.currentTime;
  hits.forEach((at, i) => (i % 2 === 0 ? kick(ctx, now + at) : snare(ctx, now + at)));
}

function kick(ctx: AudioContext, at: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(150, at);
  osc.frequency.exponentialRampToValueAtTime(45, at + 0.12);
  gain.gain.setValueAtTime(0.8, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.3);
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + 0.3);
}

function snare(ctx: AudioContext, at: number) {
  const length = Math.floor(ctx.sampleRate * 0.2);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const band = ctx.createBiquadFilter();
  band.type = "highpass";
  band.frequency.value = 1200;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.5, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
  noise.connect(band).connect(gain).connect(ctx.destination);
  noise.start(at);
}

export function playBurp() {
  const ctx = getContext();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(90, now);
  for (let t = 0; t < 0.6; t += 0.03) {
    osc.frequency.setValueAtTime(70 + Math.random() * 60, now + t);
  }
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.7);
}
