import React, {Component} from 'react'
import Tone from 'tone';
import SamplerSeq from './SamplerSeq'
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
  oh: [...Array(16).fill(0)],
  cb: [...Array(16).fill(0)],
  cng1: [...Array(16).fill(0)],
  rim: [...Array(16).fill(0)],
  cl: [...Array(16).fill(0)],
  tom1: [...Array(16).fill(0)]
}

const buffered = {
  bd : new Tone.Buffer(BD),
  sn : new Tone.Buffer(SN),
  hh : new Tone.Buffer(HH),
  oh : new Tone.Buffer(OH),
  cb : new Tone.Buffer(CB),
  cng1 : new Tone.Buffer(CNG1),
  rim : new Tone.Buffer(RIM),
  cl : new Tone.Buffer(CL),
  tom1 : new Tone.Buffer(TOM1)
}

const drumSamples = {
  bd : new Tone.Player(buffered.bd).toMaster(),
  sn : new Tone.Player(buffered.sn).toMaster(),
  hh : new Tone.Player(buffered.hh).toMaster(),
  oh : new Tone.Player(buffered.oh).toMaster(),
  cb : new Tone.Player(buffered.cb).toMaster(),
  cng1 : new Tone.Player(buffered.cng1).toMaster(),
  rim : new Tone.Player(buffered.rim).toMaster(),
  cl : new Tone.Player(buffered.cl).toMaster(), 
  tom1 : new Tone.Player(buffered.tom1).toMaster()
}

const emptyArray = [...Array(16).fill(0)]
let index = 0

class Sequencer extends Component {

  state = {
    steps: 16,
    /*index: 0*/
    play: false,
    timing: "16n",
    bpm: 90,
    volumeKnob: 0,
    swingKnob: 0,
    sequence:{
      "bd":[...emptyArray],
      "sn":[...emptyArray],
      "hh":[...emptyArray],
      "oh":[...emptyArray],
      "cb":[...emptyArray],
      "cng1":[...emptyArray],
      "rim":[...emptyArray],
      "cl":[...emptyArray],
      "tom1":[...emptyArray]
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

  transport = () => {
    Tone.Transport.bpm.value = this.state.bpm;
    Tone.Transport.scheduleRepeat(this.repeat, this.state.timing);
    //Tone.Transport.swingSubdivision = '16n'
    Tone.Transport.latencyHint = '1';
    Tone.Transport.start("+0.1")

  }

  playPause = () => {
    this.transport()
    this.setState({play: !this.state.play},
    () => this.state.play ? Tone.Transport.start() : Tone.Transport.pause() /*&& Tone.Transport.cancel()*/)
  }

  stopSound = () => {
    if(this.state.play){this.playPause()}
    Tone.Transport.cancel();
    //this.setState({index:0})
    index = 0
  }

  repeat = () =>{
    const {steps /*, index*/} = this.state
    
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

    let cbInputs = document.querySelector(
      `.cb div:nth-child(${step + 1})`
    );
    let cng1Inputs = document.querySelector(
      `.cng1 div:nth-child(${step + 1})`
    );
    let rimInputs = document.querySelector(
      `.rim div:nth-child(${step + 1})`
    );
    let clInputs = document.querySelector(
      `.cl div:nth-child(${step + 1})`
    );
    let tom1Inputs = document.querySelector(
      `.tom1 div:nth-child(${step + 1})`
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
      if (cbInputs.dataset.checked === "1") {
        drumSamples.cb.start();
      }
      if (cng1Inputs.dataset.checked === "1") {
        drumSamples.cng1.start();
      }
      if (rimInputs.dataset.checked === "1") {
        drumSamples.rim.start();
      }
      if (clInputs.dataset.checked === "1") {
        drumSamples.cl.start();
      }
      if (tom1Inputs.dataset.checked === "1") {
        drumSamples.tom1.start();
      }

    //this.setState({index: index + 1})
    index++
  } 

  handleVolume = newValue => {
    let newVolume = parseInt(newValue, 10);

    newVolume < 100
      ? (newVolume = parseInt(-50 / (newVolume + 1) * 10, 10))
      : (newVolume = 0);
    Tone.Master.volume.value = newVolume;

    this.setState({ volumeKnob: newVolume})
  };

  handleSwing = newValue => {
    let newSwing = Math.round((newValue / 100)* 10) / 10
    Tone.Transport.swing = 
    this.setState({swingKnob: newSwing});
  };

  handleBpm = newValue => {
    this.setState({
      bpm: newValue
    },() => Tone.Transport.bpm.value = this.state.bpm);
  };


  render(){
    const {sequence} = this.state

    // console.log(this.state.volumeKnob, this.state.swingKnob)
  return(

    <React.Fragment>
      <SamplerSeq sound={{sample: drumSamples.bd, type:"bd"}} sequence={sequence.bd} /*handleChange={this.handleChange}*/ />
      <SamplerSeq sound={{sample: drumSamples.sn, type:"sn"}} sequence={sequence.sn} /*handleChange={this.handleChange}*/ />
      <SamplerSeq sound={{sample: drumSamples.hh, type:"hh"}} sequence={sequence.hh} /*handleChange={this.handleChange}*/ />
      <SamplerSeq sound={{sample: drumSamples.oh, type:"oh"}} sequence={sequence.oh} /*handleChange={this.handleChange}*/ />
      <SamplerSeq sound={{sample: drumSamples.cb, type:"cb"}} sequence={sequence.cb} /*handleChange={this.handleChange}*/ />
      <SamplerSeq sound={{sample: drumSamples.cng1, type:"cng1"}} sequence={sequence.cng1} /*handleChange={this.handleChange}*/ />
      <SamplerSeq sound={{sample: drumSamples.rim, type:"rim"}} sequence={sequence.rim} /*handleChange={this.handleChange}*/ />
      <SamplerSeq sound={{sample: drumSamples.cl, type:"cl"}} sequence={sequence.cl} /*handleChange={this.handleChange}*/ />
      <SamplerSeq sound={{sample: drumSamples.tom1, type:"tom1"}} sequence={sequence.tom1} /*handleChange={this.handleChange}*/ />
      
      <button onClick={this.playPause}>{!this.state.play ? "play" : "pause" }</button>
      <button onClick={this.stopSound}>stop</button>
      <div className="control-area">
        <p>Master Control</p>
        <div className="knobs-line">
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
            min={60}
            max={180}
            value={30}
            color={true}
            onChange={this.handleBpm}
            />
            <p>Bpm</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
  }
}

export default Sequencer

// <div className="full-knob">
// <Knob
// size={30}
// numTicks={25}
// degrees={260}
// min={1}
// max={100}
// value={30}
// color={true}
// onChange={this.handleSwing}
// />
// <p>Swing</p>
// </div>