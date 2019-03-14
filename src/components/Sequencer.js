import React, {Component} from 'react'
import Tone from 'tone';
import SamplerSeq from './SamplerSeq'
import Knob from './Knob'
import BD from '../sounds/BD_808_01.wav'
import SN from '../sounds/Snare_808_01.wav'
import HH from '../sounds/CH_808_01.wav'
import OH from '../sounds/OH_A_808_03.wav'

// let defaultPattern = {
//   bd: [1, 0, 0, 0, 0, 1, 0, 0],
//   sn: [0, 0, 1, 0, 0, 0, 1, 0],
//   hh: [1, 1, 1, 1, 1, 0, 1, 1],
//   oh: [0, 0, 0, 0, 0, 1, 0, 0]
// }

const emptyPattern = {
  bd: [...Array(16).fill(0)],
  sn: [...Array(16).fill(0)],
  hh: [...Array(16).fill(0)],
  oh: [...Array(16).fill(0)]
}

const buffered = {
  bd : new Tone.Buffer(BD),
  sn : new Tone.Buffer(SN),
  hh : new Tone.Buffer(HH),
  oh : new Tone.Buffer(OH) 
}

const drumSamples = {
  bd : new Tone.Player(buffered.bd).toMaster(),
  sn : new Tone.Player(buffered.sn).toMaster(),
  hh : new Tone.Player(buffered.hh).toMaster(),
  oh : new Tone.Player(buffered.oh).toMaster() 
}

class Sequencer extends Component {

  state = {
    index: 0,
    steps: 16,
    play: false,
    timing: "16n",
    volumeKnob: 0,
    swingKnob: 0,
    sequence:{
      "bd":[],
      "sn":[],
      "hh":[],
      "oh":[]
    }
  }

  componentDidMount(){
    this.setState({sequence:{...emptyPattern}})
  }

  handleChange = (on,i,sound) => {
    const {sequence} = this.state
    let sequenceUpdate = {...sequence}
    if (on === 0) {sequenceUpdate[sound][i] = 1 }
    else{sequenceUpdate[sound][i] = 0}
    this.setState({sequence: sequenceUpdate})
  }

  transport = () =>{
    let bpmTiming = 90
    Tone.Transport.bpm.value = bpmTiming;
    Tone.Transport.scheduleRepeat(this.repeat, this.state.timing);
    Tone.Transport.bpm.value = bpmTiming; 
    Tone.Transport.swingSubdivision = '8n'
  }

  playPause = () => {
    this.transport()
    this.setState({play: !this.state.play},
    () => this.state.play ? Tone.Transport.start() : Tone.Transport.pause() && Tone.Transport.cancel())
  }

  stopSound = () => {
    if(this.state.play){this.playPause()}
    Tone.Transport.cancel();
    this.setState({index:0})
  }

  repeat = () =>{
    const {steps, index} = this.state
    
    let step = index % steps;

    let bdInputs = document.querySelector(
      `.bd div:nth-child(${step + 1})`
    );
    let snInputs = document.querySelector(
      `.sn div:nth-child(${step + 1})`
    );
    let hhInputs = document.querySelector(
      `.hh div:nth-child(${step + 1})`
    );
    let ohInputs = document.querySelector(
      `.oh div:nth-child(${step + 1})`
    );
      
      if (bdInputs.dataset.checked === "1") {
        drumSamples.bd.start();
      }
      if (snInputs.dataset.checked === "1") {
        drumSamples.sn.start();
      }
      if (hhInputs.dataset.checked === "1") {
        drumSamples.hh.start();
      }
      if (ohInputs.dataset.checked === "1") {
        drumSamples.oh.start();
      }
  
    this.setState({index: index + 1})
    console.log(index)
  } 

  handleVolume = newValue => {
    this.setState({
      volumeKnob: newValue - 60
    },() => Tone.Master.volume.value = this.state.volumeKnob)
  };

  handleSwing = newValue => {
    this.setState({
      swingKnob: Math.round((newValue / 100)* 10) / 10
    },() => Tone.Transport.swing = this.state.swingKnob);
  };


  render(){
    const {sequence} = this.state
    console.log(this.state.volumeKnob, this.state.swingKnob)
  return(

    <React.Fragment>
      <SamplerSeq sound={{sample: drumSamples.bd, type:"bd"}} sequence={sequence.bd} handleChange={this.handleChange}/>
      <SamplerSeq sound={{sample: drumSamples.sn, type:"sn"}} sequence={sequence.sn} handleChange={this.handleChange}/>
      <SamplerSeq sound={{sample: drumSamples.hh, type:"hh"}} sequence={sequence.hh} handleChange={this.handleChange}/>
      <SamplerSeq sound={{sample: drumSamples.oh, type:"oh"}} sequence={sequence.oh} handleChange={this.handleChange}/>
      <button onClick={this.playPause}>{!this.state.play ? "play" : "pause" }</button>
      <button onClick={this.stopSound}>stop</button>
      <div className="control-area">
        <div className="full-knob">
          <Knob
          size={30}
          numTicks={25}
          degrees={260}
          min={1}
          max={100}
          value={30}
          color={true}
          onChange={this.handleVolume}
          />
          <p>Volume</p>
        </div>
        <div className="full-knob">
          <Knob
          size={30}
          numTicks={25}
          degrees={260}
          min={1}
          max={100}
          value={30}
          color={true}
          onChange={this.handleSwing}
          />
          <p>Swing</p>
        </div>
      </div>
    </React.Fragment>
  )
  }
}

export default Sequencer