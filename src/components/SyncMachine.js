import React, {Component} from 'react'
import { connect } from 'react-redux'
import Tone from 'tone';
import { drumSamples, initFX, defaultPatterns } from '../presets/drums'
import DrumMachine from  './DrumMachine'
import { PureSpinner } from './htmlElements/PureSpinner';
import { SET_INIT_STORE, SET_INIT_SEQUENCER, UPDATE_SEQUENCE, CHANGE_PATTERN_NAME,
    CHANGE_PATTERN, SET_INDEX, UPDATE_SEQUENCER_STATUS } from '../store'

const mapStateToProps = (store) => ({
    store: store,
    setup: store.setup,
    sequencer: store.sequencer,
    sequence: store.sequencer.sequence,
    patternName: store.sequencer.patternName

})

const mapDispatchToProps = dispatch => ({
      setInitSetup: store => dispatch({type: SET_INIT_STORE, store}),
      setInitSequencer: sequencer => dispatch({type: SET_INIT_SEQUENCER, sequencer}),
      updateSequence: sequence => dispatch({type: UPDATE_SEQUENCE, sequence}),
      changePattern: pattern => dispatch({type: CHANGE_PATTERN, pattern}),
      changePatternName: patternName => dispatch({type: CHANGE_PATTERN_NAME, patternName}),
      setIndex: index => dispatch({type: SET_INDEX, index}),
      updateSequencerStatus: payload => dispatch(({type:UPDATE_SEQUENCER_STATUS, payload}))
})

class SyncMachine extends Component {

    state = {
        loading: true,
        name: null,
        drumDist: null,
        drumPhaser: null,
        drumvol: null,
        drumCrusher: null,
        drumPPDelay: null,
        actualPosition: 0
      }

    componentDidMount = async () => {
        await this.initSetup()
        await this.initFX()
        this.setState({
            loading: false,
            patternName: this.props.patternName
        })
    }

    componentDidUpdate(prevProps){
        const sequenceChanged = prevProps.sequence !== this.props.sequence 
        const isNotLoadingAndPlay = this.state.loading === false && this.state.play

        if(sequenceChanged && isNotLoadingAndPlay) {
            Tone.Transport.cancel() 
            this.startSequence()
        }

    }

    initSetup = async () => {

        Tone.Transport.bpm.value = this.props.sequencer.bpm;
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
            this.state.drumDist, this.state.drumPhaser, this.state.drumVol, this.state.drumCrusher, this.state.drumPPDelay, Tone.Master))
    
    }


    changePattern = (pattern) => {

        const patterns = {...this.props.sequencer.defaultPatterns}

        const {timestamp, name, index, ...sequence} = patterns[pattern]
        this.props.changePattern(sequence)
        this.props.changePatternName(name)
        this.props.setIndex(index)
        
    }

    startSequence = (startAt = 0) => {

        const {steps} = this.props.sequencer
        const {sequence} = this.props
        const sequencerTrigs = [...Array(steps).keys()]


        const drumSeq = new Tone.Sequence(function(time,i){
            Object.keys(sequence).map(drum => ( 
                [...sequence[drum]].indexOf(i) >= 0 && drumSamples.get(drum).start())) 
            }, sequencerTrigs, "16n"
        )

        this.setState({drumSeq},
        () => this.state.drumSeq.start(startAt))
    }

    updateChannelSequence = (addRemove, sound, i, actualPosition) => {

        const {sequence} = this.props 
        let soundToUpdate = [...sequence[sound]]

        if (addRemove === 'ADD') {
            soundToUpdate.push(i)
        } else if (addRemove === 'REMOVE') {
            const stepToRemove = soundToUpdate.indexOf(i)
            soundToUpdate.splice(stepToRemove,1)
        } else {
            soundToUpdate.length = 0
        }

        this.props.updateSequence({
            key: sound, 
            steps: soundToUpdate
        })
        
    }

    playStop = () => {
        this.startSequence()
        this.setState({play: !this.state.play},
        () => this.state.play ? Tone.Transport.start() : Tone.Transport.stop() && Tone.Transport.cancel())
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
        
        const valuedParameters = ['frequency', 'Q', 'wet','delayTime']
        const centValue = ['distortion', 'wet','feedback', 'delayTime']

        if (centValue.includes(effectKey)) {newValue = newValue / 100}

        const chooseNextAction = !valuedParameters.includes(effectKey) 

        chooseNextAction
        ? effectValue[effectKey] = newValue
        : effectValue[effectKey].value = newValue
        console.log(effectKey, effectValue[effectKey] )
        this.setState({
            [effectKey]: effectValue
        })
    }


    render(){

        const {loading, play, patternName } = this.state
        const { sequence,  } = this.props

        return(

            !loading && sequence 
            ?   <DrumMachine 
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
            :   <PureSpinner />
        )

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SyncMachine)


