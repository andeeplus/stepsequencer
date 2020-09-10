const initFX = {
  phaser: {
    frequency: 15,
    octaves: 3,
    stages: 5,
    Q: 10,
    baseFrequency: 350,
    wet: 1,
  },
  distortion: {
    distortion: 0.1,
    oversample: "none",
    wet: 1,
  },
  ppDelay: {
    delayTime: 0.25,
    maxDelayTime: 10,
    wet: 1,
  },
  bitReducer: {
    bits: 8,
    wet: 1,
  },
  reverb: {
    roomSize: 0.4,
    dampening: 7000,
    wet: 1
  },
};

export { initFX };
