// Audio manager — wraps HTMLAudioElement for BGM (looping) and SFX (overlapping).
// No external dependencies. Files are served from /audio/ (mapped from assets/).

// ─── Track registries ─────────────────────────────────────────────────────────

const BGM_TRACKS: Record<string, string> = {
  // Available now:
  daily1:               '/audio/bgm/daily1.mp3',
  daily2:               '/audio/bgm/daily2.mp3',
  ending_lose:          '/audio/bgm/ending_lose.mp3',
  ending_time_great:    '/audio/bgm/ending_time_great.mp3',
  ending_time_steady:   '/audio/bgm/ending_time_steady.mp3',
  ending_time_struggle: '/audio/bgm/ending_time_struggle.mp3',
};

const SFX_FILES: Record<string, string> = {
  // Available now:
  click:           '/audio/sfx/mouce_click.mp3',  // note: original filename has typo
  make_choice:     '/audio/sfx/make_choice.mp3',
  continue:        '/audio/sfx/book.mp3',
  new_student:     '/audio/sfx/new_student.mp3',
  star:            '/audio/sfx/star.mp3',
  // Placeholders — add the corresponding mp3 files to assets/audio/sfx/ to activate:
  idea:            '/audio/sfx/idea.mp3',
  project_start:   '/audio/sfx/project_start.mp3',
  project_complete:'/audio/sfx/project_complete.mp3',
  high_favor:      '/audio/sfx/high_favor.mp3',
  reward:          '/audio/sfx/reward.mp3',
  penalty:         '/audio/sfx/penalty.mp3',
};

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEY_BGM_VOL = 'lab-bgm-volume';
const KEY_SFX_VOL = 'lab-sfx-volume';
const KEY_MUTED   = 'lab-audio-muted';

const FADE_DURATION_MS = 500;
const FADE_STEPS       = 20;

// ─── AudioManager class ───────────────────────────────────────────────────────

class AudioManager {
  private bgmEl: HTMLAudioElement | null = null;
  private currentBgmId: string | null = null;

  private bgmVolume: number;
  private sfxVolume: number;
  private _muted: boolean;

  private unlocked = false;
  private pendingBgmId: string | null = null;
  private fadeTimer: ReturnType<typeof setInterval> | null = null;
  // Element currently fading out; tracked so _clearFade() can stop it if the fade is interrupted.
  private fadingOutEl: HTMLAudioElement | null = null;

  constructor() {
    this.bgmVolume = parseFloat(localStorage.getItem(KEY_BGM_VOL) ?? '0.5');
    this.sfxVolume = parseFloat(localStorage.getItem(KEY_SFX_VOL) ?? '0.7');
    this._muted     = localStorage.getItem(KEY_MUTED) === 'true';

    // Browsers block autoplay until the user has interacted with the page.
    const unlock = () => {
      if (this.unlocked) return;
      this.unlocked = true;
      document.removeEventListener('click',   unlock, true);
      document.removeEventListener('keydown', unlock, true);
      if (this.pendingBgmId !== null) {
        const id = this.pendingBgmId;
        this.pendingBgmId = null;
        this._startBgm(id);
      }
    };
    document.addEventListener('click',   unlock, true);
    document.addEventListener('keydown', unlock, true);
  }

  // ─── BGM ────────────────────────────────────────────────────────────────────

  playBgm(trackId: string): void {
    if (!this.unlocked) {
      this.pendingBgmId = trackId;
      return;
    }
    if (this.currentBgmId === trackId) return;
    this._clearFade();
    if (this.bgmEl) {
      this.bgmEl.pause();
      this.bgmEl = null;
    }
    this._startBgm(trackId);
  }

  stopBgm(): void {
    this._clearFade();
    if (this.bgmEl) {
      this.bgmEl.pause();
      this.bgmEl = null;
    }
    this.currentBgmId = null;
  }

  fadeToBgm(trackId: string): void {
    if (!this.unlocked) {
      this.pendingBgmId = trackId;
      return;
    }
    if (this.currentBgmId === trackId) return;

    // Always cancel any in-progress fade before starting a new transition.
    this._clearFade();

    if (!this.bgmEl) {
      this._startBgm(trackId);
      return;
    }

    const outgoing = this.bgmEl;
    const startVol = outgoing.volume;
    const interval = FADE_DURATION_MS / FADE_STEPS;
    let step = 0;

    // Detach from bgmEl so _startBgm doesn't touch the outgoing element.
    // fadingOutEl keeps a reference so _clearFade() can stop it if interrupted.
    this.bgmEl = null;
    this.currentBgmId = null;
    this.fadingOutEl = outgoing;

    this.fadeTimer = setInterval(() => {
      step++;
      outgoing.volume = Math.max(0, startVol * (1 - step / FADE_STEPS));
      if (step >= FADE_STEPS) {
        this._clearFade();  // pauses fadingOutEl (= outgoing) and clears timer
        this._startBgm(trackId);
      }
    }, interval);
  }

  private _startBgm(trackId: string): void {
    const src = BGM_TRACKS[trackId];
    if (!src) {
      console.warn(`[AudioManager] Unknown BGM track: "${trackId}"`);
      return;
    }
    const el = new Audio();
    el.loop = true;
    el.volume = this._effectiveBgmVol();
    el.src = src;
    el.onerror = () => {
      console.warn(`[AudioManager] Could not load BGM: ${src}`);
      if (this.bgmEl === el) { this.bgmEl = null; this.currentBgmId = null; }
    };
    this.bgmEl = el;
    this.currentBgmId = trackId;
    el.play().catch(e => {
      console.warn('[AudioManager] BGM play() rejected:', e);
      // Clear state so the next playBgm call can retry instead of short-circuiting.
      if (this.bgmEl === el) { this.bgmEl = null; this.currentBgmId = null; }
    });
  }

  // Returns true when a track is playing, starting, or a cross-fade is in progress.
  // This prevents the recovery check in useAudioTriggers from firing mid-fade and
  // creating a second audio element that overlaps the outgoing track.
  isBgmActive(): boolean {
    return this.currentBgmId !== null || this.fadeTimer !== null;
  }

  private _clearFade(): void {
    if (this.fadeTimer !== null) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
    // Stop the outgoing track so it doesn't play on as an orphaned element.
    if (this.fadingOutEl !== null) {
      this.fadingOutEl.pause();
      this.fadingOutEl = null;
    }
  }

  // ─── SFX ────────────────────────────────────────────────────────────────────

  // Each call creates a fresh Audio element so sounds can overlap freely.
  playSfx(sfxId: string): void {
    if (!this.unlocked) return;
    const src = SFX_FILES[sfxId];
    if (!src) {
      console.warn(`[AudioManager] Unknown SFX: "${sfxId}"`);
      return;
    }
    const el = new Audio(src);
    el.volume = this._effectiveSfxVol();
    el.onerror = () => console.warn(`[AudioManager] Could not load SFX: ${src}`);
    el.play().catch(e => console.warn('[AudioManager] SFX play() rejected:', e));
  }

  // ─── Volume / mute ──────────────────────────────────────────────────────────

  setBgmVolume(value: number): void {
    this.bgmVolume = Math.max(0, Math.min(1, value));
    localStorage.setItem(KEY_BGM_VOL, String(this.bgmVolume));
    if (this.bgmEl) this.bgmEl.volume = this._effectiveBgmVol();
  }

  setSfxVolume(value: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, value));
    localStorage.setItem(KEY_SFX_VOL, String(this.sfxVolume));
  }

  setMuted(muted: boolean): void {
    this._muted = muted;
    localStorage.setItem(KEY_MUTED, String(muted));
    if (this.bgmEl) this.bgmEl.volume = this._effectiveBgmVol();
  }

  isMuted(): boolean    { return this._muted; }
  getBgmVolume(): number { return this.bgmVolume; }
  getSfxVolume(): number { return this.sfxVolume; }

  private _effectiveBgmVol(): number { return this._muted ? 0 : this.bgmVolume; }
  private _effectiveSfxVol(): number { return this._muted ? 0 : this.sfxVolume; }
}

// ─── Singleton export ─────────────────────────────────────────────────────────

export const audioManager = new AudioManager();
