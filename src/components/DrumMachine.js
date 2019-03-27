import React, {Component} from 'react'
import Tone from 'tone';
import SamplerChannel from './SamplerChannel'
import Knob from './Knob'
import PatternSelector from './PatternSelector'
import Phaser from './Fx/Phaser'
import PingPongDelay from './Fx/PingPongDelay'
import Smasher from './Fx/Smasher'
import screw from '../assets/screw.png'
import { drumSamples, defaultDrumPattern, initFX, defaultPatterns } from '../presets/drums'

class DrumMachine extends Component {

  state = {
    loading: true,
    steps: 16,
    play: false,
    timing: "16n",
    bpm: 120,
    masterVolume: -3,
    volumeKnob: 0,
    sequence:{
      'bd':[],
      'sn':[],
      'hh':[],
      'oh':[],
      'cb':[],
      'cn':[],
      'rm':[],
      'cl':[],
      'tm':[]
    },
    defaultPatterns: null,
    drumDist: null,
    drumPhaser: null,
    drumvol: null,
    drumCrusher: null,
    drumPPDelay: null,
  }

  componentDidMount(){
    this.initSetup()
    this.setState({sequence:{...defaultDrumPattern}, defaultPatterns, loading: false})
  }

  initSetup = () => {

    Tone.Transport.bpm.value = this.state.bpm;
    Tone.context.latencyHint = 'fastest';
    Tone.Transport.start("+0.2")

    this.initFX()

  }
  
  initFX = () => {

    const drumDist = new Tone.Distortion(initFX.fxDistortion)
    const drumPhaser = new Tone.Phaser(initFX.fxPhaser)
    const drumVol = new Tone.Volume(this.state.masterVolume)
    const drumCrusher = new Tone.BitCrusher(initFX.fxBitCrusher)
    const drumPPDelay = new Tone.PingPongDelay(initFX.fxPPDelay)

    this.setState({drumDist, drumPhaser, drumVol, drumCrusher, drumPPDelay},
      () => drumSamples.chain(
        this.state.drumDist, this.state.drumPhaser, this.state.drumVol, this.state.drumCrusher, this.state.drumPPDelay, Tone.Master))
  
  }

  changePattern = (pattern) => {

    const patterns = {...this.state.defaultPatterns}

    const newPattern = patterns[pattern]
    this.setState({sequence: newPattern})
    
  }

  startSequence = () => {

    const {sequence, steps} = this.state
    const sequencerTrigs = [...Array(steps).keys()]

    const drumSeq = new Tone.Sequence(function(time,i){

      Object.keys(sequence).map(drum => ( 
      [...sequence[drum]].indexOf(i) >= 0 && drumSamples.get(drum).start()
    ))

    }, sequencerTrigs, "16n")

    drumSeq.start()
  }

  updateChannelSequence = (addRemove, sound, i) => {

    const {sequence} = this.state
    let individualSeq = this.state.sequence[sound]

    if (addRemove === 'ADD') {
      individualSeq.push(i)
    } else if (addRemove === 'REMOVE') {
      const stepToRemove = individualSeq.indexOf(i)
      individualSeq.splice(stepToRemove,1)
    } else {
      individualSeq.length = 0
    }
    
    this.setState({sequence: {...sequence, [sound]:individualSeq}})
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

    const effectKey = parameters[0]
    const effectValue = this.state[parameters[1]]
    
    const valuedParameters = ['frequency', 'Q', 'wet','feedback','delayTime']
    const centValue = ['distortion', 'wet','feedback', 'delayTime']
    const bitcrush = [7,6,5,4,3,2,1,0]


    if (centValue.includes(effectKey)) {newValue = newValue / 100}
    if (effectKey === 'bits') {newValue = bitcrush.indexOf(newValue) +1}

    const chooseNextAction = !valuedParameters.includes(effectKey) 

    chooseNextAction
    ? effectValue[effectKey] = newValue
    : effectValue[effectKey].value = newValue

    this.setState({
      [effectKey]: effectValue
    })
}

  render(){

    const {sequence, loading} = this.state

  return(

    !loading &&

    <div className="full-drum-machine">

    <img src={screw} alt="screw" className="screw-line" width={60} style={{position: 'absolute', top: 20, right: 20}}/>
    <img src={screw} alt="screw" className="screw-line" width={60} style={{position: 'absolute', top: 20, left: 20}}/>

    <div className='machine-div'>

    { sequence && Object.keys(sequence).map((sound) => 
      <SamplerChannel sound={sound} key={sound} sequence={sequence[sound]} updateChannelSequence={this.updateChannelSequence}/>)} 
      
      <div className="drum-options-cascade">

          <div className="patter-master">
            <button className="play" onClick={this.playStop}>{!this.state.play ? "►" : "◼" }</button>
            <PatternSelector changePattern={this.changePattern}/> 
          </div>

          <div className="control-area">
            <h1 className="text-light-inset-maxi">MASTER</h1>
            <div className="knobs-line">
              <Knob size={25} min={1} max={100} value={100} color={'darkgrey'} onChange={this.handleVolume}>VOL</Knob>
              <Knob size={25} min={60} max={180} value={120} color={'darkgrey'} onChange={this.handleBpm}>BPM</Knob>
            </div>
          </div>

          <Smasher handleValues={this.handleValues} instrument={['drumDist', 'drumCrusher']} init={{...initFX.fxDist, ...initFX.fxBitCrusher}}/>
          <PingPongDelay handleValues={this.handleValues} instrument={'drumPPDelay'} init={initFX.fxPPDelay}/>
          <Phaser handleValues={this.handleValues} instrument={'drumPhaser'} init={initFX.fxPhaser}/>

          </div>  
      </div>

    <img src={screw} alt="screw" className="screw-line"  width={60} style={{position: 'absolute', bottom: 20, right: 20}}/>
    <img src={screw} alt="screw" className="screw-line"  width={60} style={{position: 'absolute', bottom: 20, left: 20}}/>

    </div>
      )
    }
  }
  
  export default DrumMachine

