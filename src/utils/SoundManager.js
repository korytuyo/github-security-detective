export class SoundManager {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.enabled = true;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  playSound(frequency, duration, type = 'sine') {
    if (!this.enabled) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playThemeMusic() {
    if (!this.enabled) return;
    
    // Jeopardy theme inspired melody
    const notes = [
      { freq: 523, delay: 0 },    // C
      { freq: 587, delay: 100 },  // D
      { freq: 659, delay: 200 },  // E
      { freq: 698, delay: 300 },  // F
      { freq: 784, delay: 400 },  // G
      { freq: 880, delay: 500 },  // A
      { freq: 988, delay: 600 },  // B
      { freq: 1047, delay: 700 }  // C
    ];
    
    notes.forEach(note => {
      setTimeout(() => this.playSound(note.freq, 0.2), note.delay);
    });
  }

  playCorrectSound() {
    if (!this.enabled) return;
    
    this.playSound(800, 0.2);
    setTimeout(() => this.playSound(1000, 0.3), 150);
  }

  playIncorrectSound() {
    if (!this.enabled) return;
    
    this.playSound(200, 0.5, 'sawtooth');
  }

  playSelectSound() {
    if (!this.enabled) return;
    
    this.playSound(440, 0.1);
  }

  playDailyDoubleSound() {
    if (!this.enabled) return;
    
    // Ascending fanfare
    const notes = [600, 700, 800, 900, 1000];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playSound(freq, 0.2);
      }, index * 100);
    });
  }
}