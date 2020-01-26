import React, {Component} from 'react'
import { connect } from 'react-redux'
import Tone from 'tone';
import { drumSamples, initFX, defaultPatterns } from '../presets/drums'
import DrumMachine from  './DrumMachine'
import { PureSpinner } from './htmlElements/PureSpinner';
import { UPDATE_SEQUENCE, CHANGE_PATTERN_NAME,
    CHANGE_PATTERN, SET_INDEX, UPDATE_SEQUENCER_STATUS } from '../store'

const mapStateToProps = (store) => ({
    store: store,
    setup: store.setup,
    sequencer: store.sequencer,
    sequence: store.sequencer.sequence,
    patternName: store.sequencer.patternName,
    index: store.sequencer.index
})

const mapDispatchToProps = dispatch => ({
      updateSequence: sequence => dispatch({type: UPDATE_SEQUENCE, sequence}),
      changePattern: pattern => dispatch({type: CHANGE_PATTERN, pattern}),
      changePatternName: patternName => dispatch({type: CHANGE_PATTERN_NAME, patternName}),
      setIndex: index => dispatch({type: SET_INDEX, index}),
      updateSequencerStatus: payload => dispatch(({type:UPDATE_SEQUENCER_STATUS, payload}))
})

class SyncMachine extends Component {
        state = {
            loading: true,
            steps: 16,
            play: false,
            timing: "16n",
            bpm: 120,
            masterVolume: -3,
            volumeKnob: 0,
            sequence: this.props.sequence,
            defaultPatterns: null,
            drumDist: null,
            drumPhaser: null,
            drumvol: null,
            drumCrusher: null,
            drumPPDelay: null,
            drumSeq: null
        }
    
        componentDidMount (){
            this.initSetup()
            this.initFX()
            this.setState({defaultPatterns, loading: false})
        }
        
        componentDidUpdate(prevProps){
            const patternHasChanged = prevProps.index !== this.props.index 

            if(patternHasChanged) {
                Tone.Transport.cancel() 
                this.startSequence()
            }
        }
        
        initSetup = () => {
        
            Tone.Transport.bpm.value = this.state.bpm;
            Tone.context.latencyHint = 'fastest';
            Tone.Transport.start("+0.2")

        }
        
        initFX = () => {
        
            const drumDist = new Tone.Distortion(initFX.fxDistortion)
            const drumPhaser = new Tone.Phaser(initFX.fxPhaser)
            const drumVol = new Tone.Volume(this.state.masterVolume)
            const drumCrusher = new Tone.BitCrusher(initFX.fxBitCrusher)
            const drumPPDelay = new Tone.PingPongDelay(initFX.fxPPDelay)
        
            this.setState({drumDist, drumPhaser, drumVol, drumCrusher, drumPPDelay},
            () => drumSamples.chain(
                this.state.drumDist, 
                this.state.drumPhaser, 
                this.state.drumVol, 
                this.state.drumCrusher, 
                this.state.drumPPDelay, 
                Tone.Master
            ))
        
        }
    
        startSequence = (startAt=0) => {
        
            const {sequence, steps} = this.state
        
            const sequencerTrigs = [...Array(steps).keys()]
        
            const drumSeq = new Tone.Sequence(function(time,i){
                Object.keys(sequence).map(drum => ( 
                [...sequence[drum]].indexOf(i) >= 0 && drumSamples.get(drum).start()))
            }, sequencerTrigs, "16n")
        
            drumSeq.start(startAt)
        }
    
        changePattern = (pattern) => {

            const patterns = {...this.props.sequencer.defaultPatterns}

            const {timestamp, name, index, ...sequence} = patterns[pattern]
            this.setState({sequence})
            this.props.setIndex(index)
            
        }

        updateChannelSequence = (action, sound, i) => {
        
            const {sequence} = this.state
            let individualSeq = sequence[sound]
        
            if (action === 'ADD') {
            individualSeq.push(i)
            } else if (action === 'REMOVE') {
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
            () => this.state.play ? Tone.Transport.start() : Tone.Transport.stop())
        }
        
        handleVolume = (newValue) => {
        
            let newVolume = parseInt(newValue, 10);
        
            newVolume < 100
            ? (newVolume = parseInt(-50 / (newVolume + 1) * 10, 10))
            : (newVolume = 0);
        
            Tone.Master.volume.value = newVolume;
            this.setState({ volumeKnob: newVolume})
        
        }
        
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

        const { loading } = this.state
        const { sequence, play, patternName  } = this.state

        return(
            loading ? <PureSpinner />
            :   <DrumMachine 
                    play={play}
                    sequence={sequence}
                    patternName={patternName}
                    changePattern={this.changePattern}
                    updateChannelSequence={this.updateChannelSequence}
                    playStop={this.playStop}
                    handleVolume={this.handleVolume}
                    handleBpm={this.handleBpm}
                    handleValues={this.handleValues}
                />
            
        )

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SyncMachine)


