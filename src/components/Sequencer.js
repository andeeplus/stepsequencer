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
    },
    drumEffects: {},
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

  componentDidMount(){
    this.initSetup()
    this.setState({sequence:{...defaultDrummPattern}, loading: false})
  }

  initSetup = () => {
    const {bpm, volume, fxPhaser, fxDistortion} = this.state
  
    Tone.Transport.bpm.value = bpm;
    Tone.context.latencyHint = 'fastest';
    Tone.Transport.start("+0.2")

    const drumDist = new Tone.Distortion(fxDistortion)
    const drumPhaser = new Tone.Phaser(fxPhaser)
    const drumVol = new Tone.Volume(volume)

    this.setState({drumEffects: {drumDist, drumPhaser, drumVol}},
      () => drumSamples.chain(drumDist, drumPhaser, drumVol, Tone.Master))
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


  handleValue = (newValue, value) => {

    switch(value){

      case 'VOLUME':

        let newVolume = parseInt(newValue, 10);

        newVolume < 100
          ? (newVolume = parseInt(-50 / (newVolume + 1) * 10, 10))
          : (newVolume = 0);
        Tone.Master.volume.value = newVolume;
        this.setState({ volumeKnob: newVolume})
        break
      
      case 'BPM':
        Tone.Transport.bpm.value = newValue
        this.setState({ bpm: newValue})
        break
      
      case 'DISTO1':
        const prevDistro = this.state.fxDistorsion
        const distortion = newValue /10
        this.setState({fxDistortion:{...prevDistro, distortion: distortion}})
        break
      
        default: return
    }
  };


  handlePhaser = (newValue, value) => {

    const {fxPhaser} = this.state

    switch(value){

    case 'PHASER1':
      const frequency = newValue
      this.setState({
        fxPhaser: {...fxPhaser, frequency}
      });
      break

    case 'PHASER2':
      const octaves = newValue
      this.setState({
        fxPhaser: {...fxPhaser, octaves}
      });
      break

    case 'PHASER3':
    const stages = newValue
      this.setState({
        fxPhaser: {...fxPhaser, stages}
      });
      break

    case 'PHASER4':
      const Q = newValue
      this.setState({
        fxPhaser: {...fxPhaser, Q}
      });
      break

    case 'PHASER5':
      const baseFrequency = newValue
      this.setState({
        fxPhaser: {...fxPhaser, baseFrequency}
      });
      break
    
    default: return
  }
}



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
            <Knob size={30} numTicks={25} degrees={260} min={1} max={100} value={100} color={true} onChange={this.handleValue} typeValue={'VOLUME'}>Volume</Knob>
            <Knob size={30} numTicks={25} degrees={260} min={60} max={180} value={120} color={true} onChange={this.handleValue} typeValue={'BPM'}>Bpm</Knob>
        </div>
      </div>

      <div className="control-area">
        <p>Distorsion</p>
          <div className="knobs-line">
            <Knob size={30} numTicks={25} degrees={260} min={0} max={10} value={0.3} color={true} onChange={this.handleValue} typeValue={'DISTO1'}>Distorsion</Knob>
            </div>
        </div>

        <div className="control-area">
          <p>Phaser</p>
            <div className="knobs-line">
              <Knob size={30} numTicks={25} degrees={260} min={0} max={9300} value={1000} color={true} onChange={this.handlePhaser} typeValue={'PHASER1'}>Frequency</Knob>
              <Knob size={30} numTicks={25} degrees={260} min={0} max={10} value={5} color={true} onChange={this.handlePhaser} typeValue={'PHASER2'}>Octaves</Knob>
              <Knob size={30} numTicks={25} degrees={260} min={0} max={10} value={10} color={true} onChange={this.handlePhaser} typeValue={'PHASER3'}>Stages</Knob>
              <Knob size={30} numTicks={25} degrees={260} min={0} max={100} value={10} color={true} onChange={this.handlePhaser} typeValue={'PHASER4'}>Q</Knob>  
              <Knob size={30} numTicks={25} degrees={260} min={0} max={1000} value={350} color={true} onChange={this.handlePhaser} typeValue={'PHASER5'}>BaseFreq</Knob>      
          </div>
        </div>

    </React.Fragment>
  )
  }
}

export default Sequencer

/*  DISTO & PHASER


*/