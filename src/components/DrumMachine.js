import React, {Component} from 'react'
import Tone from 'tone';
import SamplerChannel from './SamplerChannel'
import Knob from './Knob'
import PatternSelector from './PatternSelector'
import screw from '../assets/screw.png'
import { drumSamples, defaultDrumPattern, defaultFXStatus, defaultPatterns } from '../presets/drums'

class DrumMachine extends Component {

  state = {
    loading: true,
    steps: 16,
    play: false,
    timing: "16n",
    bpm: 120,
    masterVolume: -3,
    volumeKnob: 0,
    drumSounds: ['bd','sn','hh','oh','cb','cn','rm','cl','tm'],
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
    const {bpm, masterVolume} = this.state
  
    Tone.Transport.bpm.value = bpm;
    Tone.context.latencyHint = 'fastest';
    Tone.Transport.start("+0.2")

    const drumDist = new Tone.Distortion(defaultFXStatus.fxDistortion)
    const drumPhaser = new Tone.Phaser(defaultFXStatus.fxPhaser)
    const drumVol = new Tone.Volume(masterVolume)
    const drumCrusher = new Tone.BitCrusher(defaultFXStatus.fxBitCrusher)
    const drumPPDelay = new Tone.PingPongDelay(defaultFXStatus.fxPPDElay)

    this.setState({drumDist, drumPhaser, drumVol, drumCrusher, drumPPDelay},
      () => drumSamples.chain(
        this.state.drumDist, this.state.drumPhaser, this.state.drumVol, this.state.drumCrusher, this.state.drumPPDelay, Tone.Master))
  }
  

  changePattern = (pattern) => {
    const patterns = {...this.state.defaultPatterns}
    const newPattern = patterns[pattern]
    this.setState({sequence: newPattern})
    this.initSetup()
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
    // parameters = [effectKey, effectValue]

    const effectKey = parameters[0]
    const effectValue = this.state[parameters[1]]
    

    const valuedParameters = ['frequency', 'Q', 'wet','feedback','delayTime']
    const centValue = ['distortion', 'wet','feedback']
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
    {sequence && Object.keys(sequence).map((sound) => 
      <SamplerChannel sound={sound} key={sound} sequence={sequence[sound]} updateChannelSequence={this.updateChannelSequence}/>)
    }
      
      <div className="drum-options-cascade">

          <div className="patter-master">
            <button className="play" onClick={this.playStop}>{!this.state.play ? "►" : "◼" }</button>
            <PatternSelector changePattern={this.changePattern}/> 
          </div>

          <div className="control-area">
            <h1 className="text-light-inset-maxi">MASTER</h1>
            <div className="knobs-line">
              <Knob size={25} numTicks={25} degrees={260} min={1} max={100} value={100} color={'darkgrey'} onChange={this.handleVolume}>VOL</Knob>
              <Knob size={25} numTicks={25} degrees={260} min={60} max={180} value={120} color={'darkgrey'} onChange={this.handleBpm}>BPM</Knob>
            </div>
          </div>

          <div className="control-area">
            <h1 className="text-light-inset-maxi">BIT CRUSHER</h1>
            <div className="knobs-line">
              <Knob size={25} numTicks={10} degrees={260} min={1} max={100} value={30} color={'darkgrey'} onChange={this.handleValues} typeValue={['distortion','drumDist']}>DIST</Knob>
              <Knob size={25} numTicks={8} degrees={260} min={1} max={8} value={1} color={'darkgrey'} onChange={this.handleValues} typeValue={['bits','drumCrusher']}>BITS</Knob>
              <Knob size={25} numTicks={10} degrees={260} min={1} max={100} value={1} color={'darkgrey'} onChange={this.handleValues} typeValue={['wet','drumCrusher']}>WET</Knob>
            </div>
          </div>

          <div className="control-area">
            <h1 className="text-light-inset-maxi">PP-DELAY</h1>
            <div className="knobs-line">
              <Knob size={25} numTicks={30} degrees={260} min={0} max={6} value={0} color={'darkgrey'} onChange={this.handleValues} typeValue={['delayTime','drumPPDelay']}>TIME</Knob>
              <Knob size={25} numTicks={10} degrees={260} min={0} max={100} value={0} color={'darkgrey'} onChange={this.handleValues} typeValue={['feedback','drumPPDelay']}>FEED</Knob>
              <Knob size={25} numTicks={10} degrees={260} min={0} max={100} value={0} color={'darkgrey'} onChange={this.handleValues} typeValue={['wet','drumPPDelay']}>WET</Knob>
              </div>    
          </div>

          <div className="control-area">
            <h1 className="text-light-inset-maxi">PHASER</h1>  
            <div className="knobs-line"> 
              <Knob size={25} numTicks={30} degrees={260} min={0} max={30} value={15} color={'darkgrey'} onChange={this.handleValues} typeValue={['frequency', 'drumPhaser']}>FREQ</Knob>
              <Knob size={25} numTicks={5} degrees={260} min={0} max={10} value={5} color={'darkgrey'} onChange={this.handleValues} typeValue={['octaves', 'drumPhaser']}>OCT</Knob>
              <Knob size={25} numTicks={12} degrees={260} min={0} max={12} value={10} color={'darkgrey'} onChange={this.handleValues} typeValue={['stages', 'drumPhaser']}>STAGES</Knob>
              <Knob size={25} numTicks={25} degrees={260} min={0} max={100} value={10} color={'darkgrey'} onChange={this.handleValues} typeValue={['Q', 'drumPhaser']}>Q</Knob>  
              <Knob size={25} numTicks={25} degrees={260} min={0} max={1000} value={350} color={'darkgrey'} onChange={this.handleValues} typeValue={['baseFrequency', 'drumPhaser']}>BFREQ</Knob>  
              <Knob size={25} numTicks={25} degrees={260} min={0} max={100} value={100} color={'darkgrey'} onChange={this.handleValues} typeValue={['wet', 'drumPhaser']}>WET</Knob>      
            </div>
          </div>
        </div>
      </div>

    <img src={screw} alt="screw" className="screw-line"  width={60} style={{position: 'absolute', bottom: 20, right: 20}}/>
    <img src={screw} alt="screw" className="screw-line"  width={60} style={{position: 'absolute', bottom: 20, left: 20}}/>

    </div>
      )
    }
  }
  
  export default DrumMachine

