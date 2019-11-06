import React, {Component} from 'react'
import { connect } from 'react-redux'
import Tone from 'tone';
import { drumSamples, initFX, defaultPatterns } from '../presets/drums'
import DrumMachine from  './DrumMachine'
import { PureSpinner } from './htmlElements/PureSpinner';
import { SET_INIT_STORE, SET_INIT_SEQUENCER, UPDATE_SEQUENCE, CHANGE_PATTERN_NAME,
    CHANGE_PATTERN, SET_INDEX } from '../store'

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
      setIndex: index => dispatch({type: SET_INDEX, index})
})

class SyncMachine extends Component {

    state = {
        loading: true,
        sequence: null,
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
        })

    }

    componentDidUpdate(prevProps, prevState){

    }

    initSetup = async () => {

        const { sequencer, setInitSequencer } = this.props

        let userPatterns = await localStorage.getItem('userPatterns')
        userPatterns = JSON.parse(userPatterns) 

        const {name, timestamp, index, ...sequence} = (userPatterns && userPatterns[0]) || defaultPatterns[0]

        await setInitSequencer({
            steps: 16,
            play: false,
            timing: "16n",
            bpm: 120,
            masterVolume: -3,
            volumeKnob: 0,
            index,
            sequence,
            patternName: name,
            defaultPatterns: userPatterns ? userPatterns : defaultPatterns
            })

        Tone.Transport.bpm.value = sequencer.bpm;
        Tone.context.latencyHint = 'fastest';
        Tone.Transport.start("+0.2")

        Tone.context.resume();

    }
    
    initFX = (fxToMount = ['SMASHER','PHASER','CRUSHER','PPDELAY']) => {

        const drumVol = new Tone.Volume(this.state.masterVolume)
        const SMASHER = new Tone.Distortion(initFX.fxDistortion)
        const CRUSHER = new Tone.BitCrusher(initFX.fxBitCrusher)
        const PHASER = new Tone.Phaser(initFX.fxPhaser)
        const PPDELAY = new Tone.PingPongDelay(initFX.fxPPDelay)

        const fxChainSetup = [
            {id: 'SMASHER', fx: SMASHER, on: !fxToMount.includes('SMASHER')}, 
            {id: 'CRUSHER', fx: CRUSHER, on: !fxToMount.includes('CRUSHER')}, 
            {id: 'PHASER', fx: PHASER, on: !fxToMount.includes('PHASER')}, 
            {id: 'PPDELAY', fx: PPDELAY, on: !fxToMount.includes('PPDELAY')}
        ]

        const actualChain = []
        const chainToLoad = []

        Object.keys(fxChainSetup.filter(fx => !fx.on).map(fx => actualChain.push(fx.id)))
        Object.keys(fxChainSetup.filter(fx => chainToLoad.push(fx.fx)))
        console.log(actualChain, chainToLoad)

        this.setState({
            ...fxChainSetup,
            actualChain: Array.from(new Set(actualChain)),
            drumVol
        }, 
        () => drumSamples.chain(
            ...chainToLoad,
            this.state.drumVol, 
            Tone.Master
            )
        )
    
    }

    powerFX = async ({fx, value}) => {
        
        const fxChainUpdate =  [...this.state.actualChain]

        if (value === 'ADD'){
            fxChainUpdate.push(fx)
        } else {
            fxChainUpdate.filter(block => block !== fx)
        }

        console.log(fxChainUpdate)
        this.setState({actualChain: fxChainUpdate}, () => this.initFX(fxChainUpdate))
    }

   


    changePattern = (pattern) => {

        const patterns = {...this.props.sequencer.defaultPatterns}

        const {timestamp, name, index, ...sequence} = patterns[pattern]
        this.setState({sequence, patternName: name})
        this.props.changePattern(sequence)
        this.props.changePatternName(name)
        this.props.setIndex(index)
        
    }

    startSequence = (startAt = 0) => {

        const {sequencer: { steps, sequence }} = this.props
        const sequencerTrigs = [...Array(steps).keys()]

        const drumSeq = new Tone.Sequence(function(time,i){
        Object.keys(sequence).map(drum => ( 
            [...sequence[drum]].indexOf(i) >= 0 && drumSamples.get(drum).start())) 
        }, sequencerTrigs, "16n")

        this.setState({drumSeq}, () => this.state.drumSeq.start(startAt))
    }
    

    updateChannelSequence = (addRemove, sound, i, actualPosition) => {

        const {sequencer: {sequence}} = this.props 
        let individualSeq = [...sequence[sound]]

        if (addRemove === 'ADD') {
            individualSeq.push(i)

        } else if (addRemove === 'REMOVE') {
            const stepToRemove = individualSeq.indexOf(i)
            individualSeq.splice(stepToRemove,1)
        } else {
            individualSeq.length = 0
        }

        this.setState(prevState => ({
            sequence: {
                ...prevState.sequence, 
                [sound]:individualSeq
                },
            actualPosition
            })
        )
        
        this.props.updateSequence({
            key: sound, 
            steps: individualSeq
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
        
        const valuedParameters = ['frequency', 'Q', 'wet', 'feedback', 'delayTime']
        const centValue = ['distortion', 'wet', 'delayTime']

        if (centValue.includes(effectKey)) {newValue = newValue / 100}

        const chooseNextAction = !valuedParameters.includes(effectKey) 

        chooseNextAction
        ? effectValue[effectKey] = newValue
        : effectValue[effectKey].value = newValue
        console.log(effectKey, effectValue[effectKey])
        this.setState({
            [effectKey]: effectValue
        })
    }


    render(){

        const {loading, play, sequence, patternName } = this.state

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
                    powerFX={this.powerFX}
                />
            :   <PureSpinner />
        )

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SyncMachine)


