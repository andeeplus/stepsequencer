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
}, () => console.log('loaded')
)

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
    name: 'Default',
    timestamp: 'default',
    "bd":[0,10],
    "sn":[4,12],
    "hh":[0,2,4,6,8,10,12,14],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[]
  },
 {
    name: 'Default1',
    timestamp: 'default',
    "bd":[0,10],
    "sn":[4,12],
    "hh":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[]
  },{
    name: 'Default2',
    timestamp: 'default',
    "bd":[0,8],
    "sn":[4,12],
    "hh":[0,2,4,6,8,10,12,14],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[16]
  },{
    name: 'Default3',
    timestamp: 'default',
    "bd":[0,4,8,12],
    "sn":[4,12],
    "hh":[0,1,3,4,5,7,8,9,11,13,15,16],
    "oh":[2,6,10,14],
    "cb":[],
    "cn":[],
    "rm":[2,5,7,9,13,15],
    "cl":[12],
    "tm":[]
  },{
    name: 'Default4',
    timestamp: 'default',
    "bd":[0,10],
    "sn":[4,12],
    "hh":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[]
  },{
    name: 'Default5',
    timestamp: 'default',
    "bd":[0,10],
    "sn":[4,12],
    "hh":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[]
  },{
    name: 'Default6',
    timestamp: 'default',
    "bd":[0,10],
    "sn":[4,12],
    "hh":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[]
  },{
    name: 'Default7',
    timestamp: 'default',
    "bd":[0,10],
    "sn":[4,12],
    "hh":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[]
  },{
    "bd":[0,10],
    "sn":[4,12],
    "hh":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[]
  },{
    name: 'Default8',
    timestamp: 'default',
    "bd":[0,10],
    "sn":[4,12],
    "hh":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15],
    "oh":[14],
    "cb":[],
    "cn":[],
    "rm":[],
    "cl":[],
    "tm":[]
  },
]

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
  drumSamples, initFX, emptyPattern, defaultPatterns
}