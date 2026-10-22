// Web Audio API synthesized mechanical keyboard sounds
// Zero external files, zero latency, ultra realistic clicks!

class MechanicalKeyboardAudio {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  public playKeyClick(type: 'char' | 'enter' | 'space' | 'backspace' = 'char') {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Base frequency and click characteristics based on key type
      let baseFreq = 420;
      let duration = 0.045;
      let clickVol = 0.22;

      if (type === 'enter') {
        baseFreq = 260;
        duration = 0.07;
        clickVol = 0.35;
      } else if (type === 'space') {
        baseFreq = 300;
        duration = 0.06;
        clickVol = 0.28;
      } else if (type === 'backspace') {
        baseFreq = 360;
        duration = 0.05;
        clickVol = 0.25;
      } else {
        // Subtle human variation
        baseFreq += (Math.random() - 0.5) * 80;
      }

      // 1. Attack click (sharp transient)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq * 2.2, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + duration);

      oscGain.gain.setValueAtTime(clickVol, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(oscGain);

      // 2. Body thock / resonance (bandpass filtered noise)
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq * 1.5, now);
      filter.Q.setValueAtTime(3.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(clickVol * 0.7, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.85);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);

      // Master output
      const masterGain = this.ctx.createGain();
      masterGain.gain.value = 0.85;

      oscGain.connect(masterGain);
      noiseGain.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      osc.start(now);
      whiteNoise.start(now);

      osc.stop(now + duration);
      whiteNoise.stop(now + duration);
    } catch {
      // Audio might fail if user hasn't interacted or policy prevents it
    }
  }
}

export const keyboardAudio = new MechanicalKeyboardAudio();
