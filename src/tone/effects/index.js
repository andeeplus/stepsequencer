const initFX = {
  phaser: {
    frequency: 15,
    octaves: 3,
    stages: 5,
    Q: 10,
    baseFrequency: 350,
    wet: 0,
  },
  distortion: {
    distortion: 0.1,
    oversample: "none",
    wet: 0,
  },
  ppDelay: {
    delayTime: 0.25,
    maxDelayTime: 10,
    wet: 0,
  },
  bitReducer: {
    bits: 8,
    wet: 0,
  },
  reverb: {
    roomSize: 0.4,
    dampening: 7000,
    wet: 0
  },
};

export { initFX };
