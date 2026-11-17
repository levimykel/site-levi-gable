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

export function playFeedbackScreech(durationSeconds = 1.4) {
  const ctx = getContext();
  const now = ctx.currentTime;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.25, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

  const distortion = ctx.createWaveShaper();
  const curve = new Float32Array(1024);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / curve.length) * 2 - 1;
    curve[i] = Math.tanh(x * 40);
  }
  distortion.curve = curve;

  for (const base of [1760, 2637, 3520]) {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(base, now);
    osc.frequency.linearRampToValueAtTime(base * 1.06, now + durationSeconds);
    osc.connect(distortion);
    osc.start(now);
    osc.stop(now + durationSeconds);
  }

  distortion.connect(gain).connect(ctx.destination);
}

export function playPowerChord() {
  const ctx = getContext();
  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

  const distortion = ctx.createWaveShaper();
  const curve = new Float32Array(1024);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / curve.length) * 2 - 1;
    curve[i] = Math.tanh(x * 12);
  }
  distortion.curve = curve;

  for (const freq of [82.41, 123.47, 164.81]) {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    osc.connect(distortion);
    osc.start(now);
    osc.stop(now + 1.6);
  }
  distortion.connect(gain).connect(ctx.destination);
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
