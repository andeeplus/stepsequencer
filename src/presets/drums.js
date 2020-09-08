import Tone from 'tone';
import BD from '../sounds/BD_808_01.wav'
import SN from '../sounds/Snare_808_01.wav'
import HH from '../sounds/CH_808_01.wav'
import OH from '../sounds/OH_A_808_03.wav'
import CB from '../sounds/Cowbell_808_01.wav'
import CNG1 from '../sounds/Conga_808_01.wav'
import RIM from '../sounds/Rim_808_01.wav'
import CL from '../sounds/Clap_808_01.wav'
import TOM1 from '../sounds/Tom_808_01.wav'


let drumIds = ["bd", "sn", "hh", "oh", "cb", "cn", "rm", "cl", "tm"]

const drumSamples = new Tone.Players({
  "bd" : BD,
  "sn" : SN,
  "hh" : HH,
  "oh" : OH,
  "cb" : CB,
  "cn" : CNG1,
  "rm" : RIM,
  "cl" : CL,
  "tm" : TOM1
})

const emptyPattern = {
  name: 'Empty',
  timestamp: new Date(),
  "bd":[],
  "sn":[],
  "hh":[],
  "oh":[],
  "cb":[],
  "cn":[],
  "rm":[],
  "cl":[],
  "tm":[]
}

const defaultPatterns = [
  {
    bd: [0],
    sn: [12],
    hh: [0, 1, 3, 4, 5, 7, 8, 9, 11, 13, 15, 16],
    oh: [14, 6],
    cb: [],
    cn: [],
    rm: [2, 5, 7, 9, 13, 15],
    cl: [12],
    tm: [],
    name: "Default",
    timestamp: "default",
    index: 0,
    bpm: 120,
  },
  {
    bd: [0, 7],
    cb: [],
    cl: [],
    cn: [],
    hh: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15],
    oh: [14],
    rm: [],
    sn: [4, 12],
    tm: [],
    name: "Straight",
    timestamp: "default",
    index: 1,
    bpm: 130,
  },
  {
    bd: [7, 6],
    sn: [7, 9],
    hh: [8, 7, 6],
    oh: [7, 5],
    cb: [6, 8, 7],
    cn: [5, 9],
    rm: [5, 9],
    cl: [3, 5, 4, 6, 7, 8, 9, 10, 11],
    tm: [16, 4, 9, 15],
    name: "Skate",
    timestamp: "default",
    index: 2,
    bpm: 120,
  },
  {
    bpm: 95,
    index: 3,
    name: "Slowly",
    timestamp: "default",
    bd: [0, 10],
    sn: [4, 12],
    hh: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15],
    oh: [14],
    cb: [],
    cn: [],
    rm: [],
    cl: [],
    tm: [],
  },
  {
    bd: [5, 6, 14, 15],
    sn: [4, 13],
    hh: [3, 12],
    oh: [2, 11],
    cb: [1, 10],
    cn: [0, 6, 2, 1, 3, 4, 5, 9, 7, 8, 10],
    rm: [0, 5, 10],
    cl: [1, 4, 9, 6],
    tm: [2, 3, 8, 7],
    name: "Sunglasses",
    timestamp: "default",
    index: 4,
    bpm: 120,
  },
  {
    bd: [0, 10],
    sn: [4, 12],
    hh: [1, 3, 5, 6, 7, 9, 10, 11, 13, 15, 2],
    oh: [14],
    cb: [3],
    cn: [6, 5],
    rm: [12, 11],
    cl: [],
    tm: [],
    name: "Perc",
    timestamp: "20:23:18",
    index: 5,
    bpm: 105,
  },
  {
    bd: [0, 3, 6, 8, 11, 14],
    sn: [],
    hh: [2, 12, 13, 5],
    oh: [],
    cb: [14],
    cn: [],
    rm: [],
    cl: [],
    tm: [],
    name: "Jukey",
    timestamp: "20:36:2",
    index: 6,
    bpm: 140,
  },
  {
    bd: [0, 4, 8, 12],
    sn: [],
    hh: [10, 2, 6, 13],
    oh: [],
    cb: [],
    cn: [],
    rm: [15, 3, 7],
    cl: [],
    tm: [9],
    name: "Techno",
    timestamp: "20:34:51",
    index: 7,
    bpm: 120,
  },
  {
    bd: [0, 9],
    sn: [4, 10],
    hh: [5, 6, 8, 11, 12, 15, 2],
    oh: [14],
    cb: [],
    cn: [],
    rm: [13],
    cl: [],
    tm: [],
    name: "DnB",
    timestamp: "20:37:24",
    index: 8,
    bpm: 172,
  },
];

const initFX = {
  fxPhaser: {
    frequency: 15,
    octaves: 3,
    stages: 5,
    Q: 10 ,
    baseFrequency  : 350
  },
  fxDistortion: {
    distortion: 0.1,
    oversample: 'none' // The oversampling of the effect. Can either be “none”, “2x” or “4x”.
  },
  fxPPDelay: {
    delayTime: 0.25,
    maxDelayTime: 10,
    wet: 0,
  },
  fxBitCrusher: {
    bits: 8,
    wet: 0
  }
}

export {
  drumSamples, initFX, emptyPattern, defaultPatterns, drumIds
}


