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

const defaultDrummPattern = {
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

class Sequencer extends Component {

  state = {
    loading: true,
    steps: 16,
    play: false,
    timing: "16n",
    bpm: 120,
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
    }
  }

  componentDidMount(){
    this.initSetup()
    this.setState({sequence:{...defaultDrummPattern}, loading: false})
  }

  initSetup = () => {
    const {volume, bpm} = this.state
    Tone.Transport.bpm.value = bpm;
    Tone.context.latencyHint = 'fastest';
    Tone.Transport.start("+0.2")
    const drums = new Tone.Volume(volume).toMaster()
    drumSamples.connect(drums)
  }

  startSequence = () => {

    const {sequence, drumSounds} = this.state

    const drumSeq = new Tone.Sequence(function(time,i){

      drumSounds.map(drum => ( 
      [...sequence[drum]].indexOf(i) >= 0 && drumSamples.get(drum).start()
    ))

    }, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "16n")

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


  handleVolume = newValue => {
    let newVolume = parseInt(newValue, 10);

    newVolume < 100
      ? (newVolume = parseInt(-50 / (newVolume + 1) * 10, 10))
      : (newVolume = 0);
    Tone.Master.volume.value = newVolume;

    this.setState({ volumeKnob: newVolume})
  };


  handleBpm = newValue => {
    this.setState({
      bpm: newValue
    },() => Tone.Transport.bpm.value = this.state.bpm);
  };


  render(){

    const {sequence, loading} = this.state

  return(
    !loading &&
    <React.Fragment>
    
      {sequence && Object.keys(sequence).map((sound) => 
        <SamplerChannel sound={sound} key={sound} sequence={sequence[sound]} updateGlobalSequence={this.updateGlobalSequence}/>)}

      <button onClick={this.playStop}>{!this.state.play ? "play" : "stop" }</button>
      <div className="control-area">
        <p>Master Control</p>
        <div className="knobs-line">
          <div className="full-knob">
            <Knob size={30} numTicks={25} degrees={260} min={1} max={100} value={100} color={true} onChange={this.handleVolume}/>
            <p>Volume</p>
          </div>
          <div className="full-knob">
          <Knob size={30} numTicks={25} degrees={260} min={60} max={180} value={120} color={true} onChange={this.handleBpm}/>
            <p>Bpm</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
  }
}

export default Sequencer
