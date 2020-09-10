const initFX = {
  phaser: {
    frequency: 15,
    octaves: 3,
    stages: 5,
    Q: 10,
    baseFrequency: 350,
  },
  distortion: {
    distortion: 0.1,
    oversample: "none",
  },
  ppDelay: {
    delayTime: 0.25,
    maxDelayTime: 10,
  },
  bitCrusher: {
    bits: 8,
  },
  reverb: {
    roomSize: 0.4,
    dampening: 7000,
  },
};

export { initFX };
