import React, { Component } from "react";
import { connect } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import Tone from "tone";
import {
  drumSamples,
  initFX,
  drumIds,
} from "../presets/drums";
import DrumMachine from "./DrumMachine";
import { PureSpinner } from "./htmlElements/PureSpinner";
import {
  UPDATE_SEQUENCE,
  CHANGE_PATTERN_NAME,
  CHANGE_PATTERN,
  SET_INDEX,
  UPDATE_SEQUENCER_STATUS,
} from "../store";
import ModalSetup from "./tools/Modal";
import { Box, Button } from "ui";

const mapStateToProps = (store) => ({
  store: store,
  setup: store.setup,
  sequencer: store.sequencer,
  sequence: store.sequencer.sequence,
  patternName: store.sequencer.patternName,
  masterVolume: store.sequencer.masterVolume,
  index: store.sequencer.index,
  play: store.sequencer.play,
  bpm: store.sequencer.bpm,
});

const mapDispatchToProps = (dispatch) => ({
  updateSequence: (sequence) => dispatch({ type: UPDATE_SEQUENCE, sequence }),
  changePattern: ({ sequence, bpm }) =>
    dispatch({ type: CHANGE_PATTERN, sequence, bpm }),
  changePatternName: (patternName) =>
    dispatch({ type: CHANGE_PATTERN_NAME, patternName }),
  changeBpm: (bpm) => dispatch({ type: CHANGE_PATTERN_NAME, bpm }),
  setIndex: (index) => dispatch({ type: SET_INDEX, index }),
  updateSequencerStatus: (payload) =>
    dispatch({ type: UPDATE_SEQUENCER_STATUS, payload }),
});

class SyncMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      timing: "16n",
      audioContextIsActive: false,
      indexSeq: 0,
    };
    this.drumDist = null;
    this.drumPhaser = null;
    this.drumvol = null;
    this.drumCrusher = null;
    this.drumPPDelay = null;
    this.drumSeq = null;
    this.TONE = Tone;
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps) {
    const patternHasChanged =
      this.props.play && prevProps.index !== this.props.index;

    if (patternHasChanged) {
      this.TONE.Transport.cancel();
      this.startSequence();
    }

    if (prevProps.bpm !== this.props.bpm) {
      this.TONE.Transport.bpm.value = this.props.bpm;
    }
    /* Randomizer - randomizeSequence => TODO
        if(this.state.indexSeq === 15) {
            this.randomizeSequence(defaultPatterns)
        }
    */
  }

  randomizeSequence() {
    let randomizer = (patterns) => {
      const _shuffle = (array) => array.sort(() => Math.random() - 0.5);

      let patternsToShuffle = cloneDeep(patterns);
      let soundsKey = [...drumIds];
      let shuffledOrder = _shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      let shuffledValues = Object.values(patternsToShuffle);
      let newSequence = {};
      soundsKey.map(
        (key, index) =>
          (newSequence[key] = shuffledValues[shuffledOrder[index]][key])
      );
      return newSequence;
    };

    let sequence = randomizer([...this.props.sequencer.defaultPatterns]);
    this.props.changePattern({ sequence });
  }

  restart() {
    this.setState({ indexSeq: 0 });
    this.TONE.Transport.cancel();
    this.startSequence();
  }

  initSetup = () => {
    this.TONE.Transport.bpm.value = this.props.bpm;
    this.TONE.context.latencyHint = "fastest";
    this.TONE.Transport.start("+0.2");
  };

  initFX = async () => {
    this.drumDist = new Tone.Distortion(initFX.fxDistortion);
    this.drumPhaser = new Tone.Phaser(initFX.fxPhaser);
    this.drumCrusher = new Tone.BitCrusher(initFX.fxBitCrusher);
    this.drumPPDelay = new Tone.PingPongDelay(initFX.fxPPDelay);
    this.drumVol = new Tone.Volume(this.props.masterVolume);
  };

  startSequence = (startAt = 0) => {
    this.drumSeq && this.drumSeq.cancel();
    const {
      sequence,
      sequencer: { steps },
    } = this.props;

    const sequencerTrigs = [...Array(steps).keys()];

    this.drumSeq = new Tone.Sequence(
      (time, i) => {
        this.TONE.Draw.schedule(() => {
          this.setState({ indexSeq: i });
        }, time);
        Object.keys(sequence).map(
          (drum) =>
            [...sequence[drum]].indexOf(i) >= 0 && drumSamples.get(drum).start()
        );
      },
      sequencerTrigs,
      "16n"
    );

    this.drumSeq.start(startAt);
  };

  changePattern = (pattern) => {
    const defaultPatterns = [...this.props.sequencer.defaultPatterns];
    const patterns = { ...defaultPatterns };
    const { timestamp, name, index, bpm, ...sequence } = patterns[pattern];
    this.props.changePattern({ sequence, bpm });
    this.props.changePatternName(name);
    this.props.setIndex(index);
  };

  updateChannelSequence = (action, sound, i) => {
    const { sequence } = this.props;
    let individualSeq = sequence[sound];

    if (action === "ADD") {
      individualSeq.push(i);
    } else if (action === "REMOVE") {
      const stepToRemove = individualSeq.indexOf(i);
      individualSeq.splice(stepToRemove, 1);
    } else {
      individualSeq.length = 0;
    }

    this.props.updateSequence({
      key: sound,
      steps: individualSeq,
    });
  };

  playStop = () => {
    this.startSequence();
    !this.props.play ? Tone.Transport.start() : Tone.Transport.stop();
    this.props.updateSequencerStatus({ play: !this.props.play });
  };

  handleVolume = (newValue) => {
    let newVolume = parseInt(newValue, 10);

    newVolume < 100
      ? (newVolume = parseInt((-50 / (newVolume + 1)) * 10, 10))
      : (newVolume = 0);

    this.TONE.Master.volume.value = newVolume;
  };

  handleBpm = (newValue) => {
    this.props.changeBpbm(newValue);
  };

  handleValues = (newValue, parameters = []) => {
    const effectKey = parameters[0];
    const effectValue = this[parameters[1]];

    const valuedParameters = ["frequency", "Q", "wet", "feedback", "delayTime"];
    const centValue = ["distortion", "wet", "feedback", "delayTime"];

    if (centValue.includes(effectKey)) {
      newValue = newValue / 100;
    }

    const chooseNextAction = !valuedParameters.includes(effectKey);

    chooseNextAction
      ? (effectValue[effectKey] = newValue)
      : (effectValue[effectKey].value = newValue);

    this[effectKey] = effectValue;
  };

  activateAudioContext = async () => {
    await this.initSetup();
    await this.initFX();
    drumSamples.chain(
      this.drumDist,
      this.drumPhaser,
      this.drumCrusher,
      this.drumPPDelay,
      this.drumVol,
      this.TONE.Master
    );

    this.setState({ audioContextIsActive: true });
  };

  render() {
    const { loading } = this.state;
    const { play, patternName } = this.props;

    return loading ? (
      <PureSpinner />
    ) : (
      <Box
        height="-webkit-fill-available"
        alignItems="center"
        width="100%"
        bg="gray.9"
        justifyContent="center"
      >
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
        <ModalSetup
          visible={!this.state.audioContextIsActive}
          dismiss={this.activateAudioContext}
          children={
            <Box bg="gray.9" p={4} justifyContent="center">
              <Button onClick={this.activateAudioContext}>Enable Audio</Button>
            </Box>
          }
        />
      </Box>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SyncMachine);
