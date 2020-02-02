import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import Tone from 'tone';
import { drumSamples, initFX, defaultPatterns, drumIds } from '../presets/drums'
import DrumMachine from  './DrumMachine'
import { PureSpinner } from './htmlElements/PureSpinner';
import { UPDATE_SEQUENCE, CHANGE_PATTERN_NAME,
    CHANGE_PATTERN, SET_INDEX, UPDATE_SEQUENCER_STATUS } from '../store'
import ModalSetup from './tools/Modal';
import styled from 'styled-components';
import { FlexContainer } from '../styles';
import Footer from './Footer';

const mapStateToProps = (store) => ({
    store: store,
    setup: store.setup,
    sequencer: store.sequencer,
    sequence: store.sequencer.sequence,
    patternName: store.sequencer.patternName,
    index: store.sequencer.index,
    play: store.sequencer.play,
    bpm: store.sequencer.bpm
})

const mapDispatchToProps = dispatch => ({
      updateSequence: sequence => dispatch({type: UPDATE_SEQUENCE, sequence}),
      changePattern: pattern => dispatch({type: CHANGE_PATTERN, pattern}),
      changePatternName: patternName => dispatch({type: CHANGE_PATTERN_NAME, patternName}),
      setIndex: index => dispatch({type: SET_INDEX, index}),
      updateSequencerStatus: payload => dispatch(({type:UPDATE_SEQUENCER_STATUS, payload}))
})




class SyncMachine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            timing: "16n",
            bpm: 120,
            masterVolume: -3,
            volumeKnob: 0,
            defaultPatterns: null,
            drumDist: null,
            drumPhaser: null,
            drumvol: null,
            drumCrusher: null,
            drumPPDelay: null,
            drumSeq: null,
            audioContextIsActive: false,
            indexSeq: 0
        }
        this.drumSamples = drumSamples
    }

    componentDidMount (){
        this.initSetup()
        this.initFX()
        this.setState({defaultPatterns, loading: false})
    }
    
    componentDidUpdate(prevProps){
        const patternHasChanged = this.props.play && prevProps.index !== this.props.index 

        if(patternHasChanged) {
            Tone.Transport.cancel() 
            this.startSequence()
        }

        //if (Tone.context.state !== 'running') Tone.context.resume()
        //if(this.state.indexSeq === 15) this.randomizeSequence()
    }

    randomizeSequence() {
        let randomizer = (patterns) => {
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            let patternsToShuffle = cloneDeep(patterns)
            let soundsKey = [...drumIds]
            let shuffledOrder = shuffle([0,1,2,3,4,5,6,7,8])
            let shuffledValues = Object.values(patternsToShuffle)
            let newSequence = {}
            soundsKey.map((key, index) => newSequence[key] = shuffledValues[shuffledOrder[index]][key])
            return newSequence
        }

        this.setState({indexSeq: 0})
        let sequence = randomizer(this.props.sequencer.defaultPatterns)
        this.props.changePattern(sequence)
        Tone.Transport.cancel() 
        this.startSequence()
    }

    initSetup = () => {
        Tone.Transport.bpm.value = this.props.bpm;
        Tone.context.latencyHint = 'fastest';
        Tone.Transport.start("+0.2")

    }
    
    initFX = async () => {
    
        const drumDist = new Tone.Distortion(initFX.fxDistortion)
        const drumPhaser = new Tone.Phaser(initFX.fxPhaser)
        const drumVol = new Tone.Volume(this.state.masterVolume)
        const drumCrusher = new Tone.BitCrusher(initFX.fxBitCrusher)
        const drumPPDelay = new Tone.PingPongDelay(initFX.fxPPDelay)
    
        this.setState({drumDist, drumPhaser, drumVol, drumCrusher, drumPPDelay}, 
            () => this.drumSamples = drumSamples.chain(
                this.state.drumDist, 
                this.state.drumPhaser, 
                this.state.drumCrusher, 
                this.state.drumPPDelay, 
                this.state.drumVol, 
                Tone.Master
            )
        )
    }

    startSequence = (startAt=0) => {

        const { drumSamples} = this
        const { steps } = this.props.sequencer
        const { sequence }  = this.props
    
        const sequencerTrigs = [...Array(steps).keys()]
    
        const drumSeq = new Tone.Sequence((time,i) => {
            Tone.Draw.schedule(() => {
                this.setState({indexSeq: i})
            }, time) 
            Object.keys(sequence).map(drum => [...sequence[drum]].indexOf(i) >= 0 && drumSamples.get(drum).start())
        }, sequencerTrigs, "16n")
    
        this.setState({drumSeq}, () => this.state.drumSeq.start(startAt))
        
    }

    changePattern = (pattern) => {

        const defaultPatterns = cloneDeep(this.props.sequencer.defaultPatterns)
        const patterns = {...defaultPatterns}
        const {timestamp, name, index, ...sequence} = patterns[pattern]
        this.props.changePattern(sequence)
        this.props.setIndex(index)
        
    }

    updateChannelSequence = (action, sound, i) => {
    
        const {sequence} = this.props
        let individualSeq = sequence[sound]
    
        if (action === 'ADD') {
        individualSeq.push(i)
        } else if (action === 'REMOVE') {
        const stepToRemove = individualSeq.indexOf(i)
        individualSeq.splice(stepToRemove,1)
        } else {
        individualSeq.length = 0
        }

        this.props.updateSequence({
            key: sound, 
            steps: individualSeq
        })

    }

    playStop = () => {

        this.startSequence()
        !this.props.play ? Tone.Transport.start() : Tone.Transport.stop()  
        this.props.updateSequencerStatus({play: !this.props.play})
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
    
        if (centValue.includes(effectKey)) {newValue = newValue / 100}
    
        const chooseNextAction = !valuedParameters.includes(effectKey) 
    
        chooseNextAction
        ? effectValue[effectKey] = newValue
        : effectValue[effectKey].value = newValue
    
        this.setState({[effectKey]: effectValue })
    }

    activateAudioContext = () => { 
        Tone.start() 
        this.setState({audioContextIsActive: true})
    }

    render(){

        const { loading } = this.state
        const { play, patternName  } = this.props

        const Button = styled.button`
            padding: 11px 42px;
            background-color: #E0E5EC;
            color: white;
            border-radius: 50px;
            cursor: pointer;
            text-decoration: none;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 500;
            transition: all 0.4s ease-in-out;
            box-shadow: 0px 0px 12px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5);
            :hover{
                border: ${props => props.active && '2px solid antiquewhite'};
                transform: scale(0.96, 0.96);
                transition: background-color, box-shadow, transform 0.2s ease-in-out;
            }
        `

        return(
            loading ? <PureSpinner />
            :   <Fragment>
                    <DrumMachine 
                        play={play}
                        sequence={this.props.sequence}
                        patternName={patternName}
                        changePattern={this.changePattern}
                        updateChannelSequence={this.updateChannelSequence}
                        playStop={this.playStop}
                        handleVolume={this.handleVolume}
                        handleBpm={this.handleBpm}
                        handleValues={this.handleValues}
                        patternIndex={this.props.index}
                        indexSeq={this.state.indexSeq}
                    />   
                    <Footer toggleTheme={this.props.toggleTheme}/>
                    <ModalSetup
                        visible={!this.state.audioContextIsActive}
                        dismiss={this.activateAudioContext}
                        children={
                            <FlexContainer justifyContent='center'>
                                <Button  onClick={this.activateAudioContext}>Enable Audio</Button>
                            </FlexContainer>} 
                    />
                </Fragment>
        )

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SyncMachine)


