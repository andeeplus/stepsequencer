import React, {Component} from 'react'
import Tone from 'tone';
import SamplerChannel from './SamplerChannel'
import Knob from './Knob'
import BD from '../sounds/BD_808_01.wav'
import SN from '../sounds/Snare_808_01.wav'
import HH from '../sounds/CH_808_01.wav'
import OH from '../sounds/OH_A_808_03.wav'
import CB from '../sounds/Cowbell_808_01.wav'
import CNG1 from '../sounds/Conga_808_01.wav'
import RIM from '../sounds/Rim_808_01.wav'
import CL from '../sounds/Clap_808_01.wav'
import TOM1 from '../sounds/Tom_808_01.wav'
import screw from '../assets/screw.png'

const drumSamples = new Tone.Players({
  "bd" : BD,
  "sn" : SN,
  "hh" : HH,
  "oh" : OH,
  "cb" : CB,
  "cng1" : CNG1,
  "rim" : RIM,
  "cl" : CL,
  "tom1" : TOM1
}, () => console.log('loaded')
)

const defaultDrumPattern = {
  "bd":[0,10],
  "sn":[4,12],
  "hh":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,15],
  "oh":[14],
  "cb":[],
  "cng1":[],
  "rim":[],
  "cl":[],
  "tom1":[]
}

const defaultFXStatus = {
  fxPhaser: {
    frequency  : 15,
    octaves  : 3,
    stages  : 5,
    Q  : 10 ,
    baseFrequency  : 350
  },
  fxDistortion : {
    distortion  : 0.2,
    oversample  : 'none' // The oversampling of the effect. Can either be “none”, “2x” or “4x”.
  }
}

class Sequencer extends Component {

  state = {
    loading: true,
    steps: 16,
    play: false,
    timing: "16n",
    bpm: 120,
    masterVolume: -3,
    volumeKnob: 0,
    drumSounds: ['bd','sn','hh','oh','cb','cng1','rim','cl','tom1'],
    sequence:{
      'bd':[],
      'sn':[],
      'hh':[],
      'oh':[],
      'cb':[],
      'cng1':[],
      'rim':[],
      'cl':[],
      'tom1':[]
    },
    drumDist: null,
    drumPhaser: null,
    drumvol: null
  }

  componentDidMount(){
    this.initSetup()
    this.setState({sequence:{...defaultDrumPattern}, loading: false})
  }

  initSetup = () => {
    const {bpm, masterVolume} = this.state
  
    Tone.Transport.bpm.value = bpm;
    Tone.context.latencyHint = 'fastest';
    Tone.Transport.start("+0.2")

    const drumDist = new Tone.Distortion()
    const drumPhaser = new Tone.Phaser()
    const drumVol = new Tone.Volume(masterVolume)

    this.setState({drumDist: drumDist,drumPhaser: drumPhaser,drumVol: drumVol},
      () => drumSamples.chain(
        this.state.drumDist, this.state.drumPhaser, this.state.drumVol, Tone.Master))
  }

  

  startSequence = () => {

    const {sequence, drumSounds, steps} = this.state
    const sequencerTrigs = [...Array(steps).keys()]

    const drumSeq = new Tone.Sequence(function(time,i){

      drumSounds.map(drum => ( 
      [...sequence[drum]].indexOf(i) >= 0 && drumSamples.get(drum).start()
    ))

    }, sequencerTrigs, "16n")

    drumSeq.start()
  }

  updateGlobalSequence = (newSequence,sound) => {
    const {sequence} = this.state
    this.setState({sequence: {...sequence, [sound]:newSequence}})
  }


  playStop = () => {
    this.startSequence()
    this.setState({play: !this.state.play},
    () => this.state.play ? Tone.Transport.start() : Tone.Transport.pause() && Tone.Transport.cancel())
  }


  handleVolume = (newValue) => {

    let newVolume = parseInt(newValue, 10);

    newVolume < 100
      ? (newVolume = parseInt(-50 / (newVolume + 1) * 10, 10))
      : (newVolume = 0);

    Tone.Master.volume.value = newVolume;
    this.setState({ volumeKnob: newVolume})

  };

  handleBpm = (newValue) =>{
    Tone.Transport.bpm.value = newValue
    this.setState({ bpm: newValue})
  }


  handleValues = (newValue, parameters = []) => {
    // parameters = [effectKey, effectName]

    const parameterUpdate = this.state[parameters[1]]

    const valuedParameters = ['frequency', 'Q', 'wet']

    const chooseNextAction = !valuedParameters.includes(parameters[0]) 

    if (parameters[0] === 'distortion') {newValue = newValue / 100}

    chooseNextAction
    ? parameterUpdate[parameters[0]] = newValue
    : parameterUpdate[parameters[0]].value = newValue

    this.setState({
      [parameters[1]]: parameterUpdate
    })
}



  render(){

    const {sequence, loading} = this.state

  return(
    !loading &&
    <React.Fragment>

    <img src={screw} alt="screw" className="screw-line" width={60} style={{position: 'absolute', top: 20, right: 20}}/>
    <img src={screw} alt="screw" className="screw-line" width={60} style={{position: 'absolute', top: 20, left: 20}}/>

    <div className='machine-div'>
    {sequence && Object.keys(sequence).map((sound) => 
      <SamplerChannel sound={sound} key={sound} sequence={sequence[sound]} updateGlobalSequence={this.updateGlobalSequence}/>)}
      
      <button className="play" onClick={this.playStop}>{!this.state.play ? "►" : "◼" }</button>
      
      <div className="control-area">
      <div className="knobs-line">
      <Knob size={30} numTicks={25} degrees={260} min={1} max={100} value={100} color={'darkgrey'} onChange={this.handleVolume}>VOL</Knob>
      <Knob size={30} numTicks={25} degrees={260} min={60} max={180} value={120} color={'darkgrey'} onChange={this.handleBpm}>BPM</Knob>
      <Knob size={30} numTicks={10} degrees={260} min={1} max={100} value={30} color={'darkgrey'} onChange={this.handleValues} typeValue={['distortion','drumDist']}>DIST</Knob>
      <h1 className="text-light-inset-maxi"> Master</h1>
      </div>
      </div>
      
      <div className="control-area">
      <div className="knobs-line"> 
      <Knob size={30} numTicks={30} degrees={260} min={0} max={30} value={15} color={'darkgrey'} onChange={this.handleValues} typeValue={['frequency', 'drumPhaser']}>FREQ</Knob>
      <Knob size={30} numTicks={5} degrees={260} min={0} max={10} value={5} color={'darkgrey'} onChange={this.handleValues} typeValue={['octaves', 'drumPhaser']}>OCT</Knob>
      <Knob size={30} numTicks={12} degrees={260} min={0} max={12} value={10} color={'darkgrey'} onChange={this.handleValues} typeValue={['stages', 'drumPhaser']}>STAGES</Knob>
      <Knob size={30} numTicks={25} degrees={260} min={0} max={100} value={10} color={'darkgrey'} onChange={this.handleValues} typeValue={['Q', 'drumPhaser']}>Q</Knob>  
      <Knob size={30} numTicks={25} degrees={260} min={0} max={1000} value={350} color={'darkgrey'} onChange={this.handleValues} typeValue={['baseFrequency', 'drumPhaser']}>BFREQ</Knob>  
      <Knob size={30} numTicks={25} degrees={260} min={0} max={100} value={100} color={'darkgrey'} onChange={this.handleValues} typeValue={['wet', 'drumPhaser']}>WET</Knob>      
      <h1 className="text-light-inset-maxi">Phaser</h1>
      </div>
      </div>
      </div>

      <img src={screw} alt="screw" className="screw-line"  width={60} style={{position: 'absolute', bottom: 20, right: 20}}/>
      <img src={screw} alt="screw" className="screw-line"  width={60} style={{position: 'absolute', bottom: 20, left: 20}}/>

      </React.Fragment>
      )
    }
  }
  
  export default Sequencer

/*  DISTO & PHASER


*/