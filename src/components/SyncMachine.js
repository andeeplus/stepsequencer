import React, { Component } from "react";
import { connect } from "react-redux";
import Tone from "tone";
import { drumIds } from "../presets/drums";
import { eightOeight } from "../tone/samples/drums";
import DrumMachine from "./DrumMachine";
import {
  UPDATE_SEQUENCE,
  CHANGE_BPM,
  CHANGE_PATTERN,
  UPDATE_SEQUENCER_STATUS,
  UPDATE_EFFECT_STATE,
  SET_INITIAL_STATE,
} from "../store/actions/sequencerActions";
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
  fxStatus: store.sequencer.effects.status,
  fxState: store.sequencer.effects.state,
});

const mapDispatchToProps = (dispatch) => ({
  updateSequence: (sequence) => dispatch({ type: UPDATE_SEQUENCE, sequence }),
  changePattern: ({ sequence, bpm, name, index }) =>
    dispatch({ type: CHANGE_PATTERN, sequence, bpm, name, index }),
  changeBpm: (bpm) => dispatch({ type: CHANGE_BPM, bpm }),
  updateSequencerStatus: (payload) =>
    dispatch({ type: UPDATE_SEQUENCER_STATUS, payload }),
  updateFxState: (name, fxState) =>
    dispatch({ type: UPDATE_EFFECT_STATE, name, fxState }),
  setUserState: (state) => dispatch({ type: SET_INITIAL_STATE, state }),
});

class SyncMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timing: "16n",
      audioContextIsActive: false,
      indexSeq: 0,
    };
    this.distortion = null;
    this.sequence = props.sequence;
    this.phaser = null;
    this.drumvol = null;
    this.bitReducer = null;
    this.ppDelay = null;
    this.reverb = null;
    this.Sequence = null;
    this.indexSeq = 0;
    this.drumSamples = eightOeight;
  }

  componentDidMount() {
    let local = localStorage.getItem("dmachine");
    const data = local && JSON.parse(local);
    const dmachine = data && data.dmachine;
    if (dmachine) {
      const defaultPatterns = dmachine.defaultPatterns;
      const effects = dmachine.effects;
      const initialPattern = defaultPatterns[0];

      const { name, timestamp, index, bpm, ...sequence } = initialPattern;

      this.props.setUserState({
        sequence: sequence,
        patternName: name,
        defaultPatterns,
        effects,
        index,
        bpm,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const patternHasChanged =
      this.props.play && prevProps.index !== this.props.index;

    if (patternHasChanged) {
      this.Tone.Transport.cancel();
      this.startSequence();
    }

    if (prevProps.bpm !== this.props.bpm) {
      this.Tone.Transport.bpm.value = this.props.bpm;
    }

    if (this.state.audioContextIsActive) this.reviewEffectStatus(prevProps);
  }

  reviewEffectStatus = (prevProps) => {
    //TODO: Helper for all kind of values update and save effect state to redux. Need to have the possibility to store debounced values for effects.

    if (this.props.fxStatus.ppDelay !== prevProps.fxStatus.ppDelay) {
      if (this.props.fxStatus.ppDelay) {
        this.ppDelay.wet.value = this.props.fxState.ppDelay.wet;
      } else {
        this.props.updateFxState("ppDelay", this.ppDelay.get());
        this.ppDelay.wet.value = 0;
      }
    }

    if (this.props.fxStatus.distortion !== prevProps.fxStatus.distortion) {
      if (this.props.fxStatus.bitReducer) {
        this.distortion.wet.value = this.props.fxState.distortion.wet;
      } else {
        this.props.updateFxState("distortion", this.distortion.get());
        this.distortion.wet.value = 0;
      }
    }

    if (this.props.fxStatus.bitReducer !== prevProps.fxStatus.bitReducer) {
      if (this.props.fxStatus.bitReducer) {
        this.bitReducer.wet.value = this.props.fxState.bitReducer.wet;
      } else {
        this.props.updateFxState("bitReducer", this.bitReducer.get());
        this.bitReducer.wet.value = 0;
      }
    }

    if (this.props.fxStatus.phaser !== prevProps.fxStatus.phaser) {
      if (this.props.fxStatus.phaser) {
        this.phaser.wet.value = this.props.fxState.phaser.wet;
      } else {
        this.props.updateFxState("phaser", this.phaser.get());
        this.phaser.wet.value = 0;
      }
    }

    if (this.props.fxStatus.reverb !== prevProps.fxStatus.reverb) {
      if (this.props.fxStatus.reverb) {
        this.reverb.wet.value = this.props.fxState.reverb.wet;
      } else {
        this.props.updateFxState("reverb", this.reverb.get());
        this.reverb.wet.value = 0;
      }
    }
  };

  initSetup = () => {
    this.Tone = Tone;
    this.Tone.Transport.bpm.value = this.props.bpm;
    this.Tone.Master.volume.value = this.props.masterVolume;
    this.Tone.context.latencyHint = "fastest";
    this.Tone.Transport.start("+0.2");
  };

  initFX = async () => {
    this.distortion = new Tone.Distortion(this.props.fxState.distortion);
    this.phaser = new Tone.Phaser(this.props.fxState.phaser);
    this.bitReducer = new Tone.BitCrusher(this.props.fxState.bitReducer);
    this.ppDelay = new Tone.PingPongDelay(this.props.fxState.ppDelay);
    this.reverb = new Tone.Freeverb(this.props.fxState.reverb);
    this.drumVol = new Tone.Volume(this.props.masterVolume);

    this.distortion.wet.value = this.props.fxState.distortion.wet || 0;

    this.phaser.wet.value = this.props.fxState.phaser.wet || 0;

    this.bitReducer.wet.value = this.props.fxState.bitReducer.wet || 0;

    this.ppDelay.wet.value = this.props.fxState.ppDelay.wet || 0;

    this.reverb.wet.value = this.props.fxState.reverb.wet || 0;
  };

  activateAudioContext = async () => {
    await this.initSetup();
    await this.initFX();
    this.drumSamples.chain(
      this.distortion,
      this.phaser,
      this.bitReducer,
      this.ppDelay,
      this.reverb,
      this.drumVol,
      this.Tone.Master
    );

    console.log(
      "%c :: Audio Context has been loaded successfully! :: ",
      "background: blue; color: white"
    );
    this.setState({ audioContextIsActive: true });
  };

  startSequence = (startAt = 0) => {
    this.Sequence && this.Sequence.cancel();
    const {
      sequencer: { steps },
    } = this.props;

    const sequencerTrigs = [...Array(steps).keys()];

    this.Sequence = new Tone.Sequence(
      (time, i) => {
        this.Tone.Draw.schedule(() => {
          this.setState({ indexSeq: i });
        }, time);

        let drum;
        for (drum of drumIds) {
          if (this.sequence[drum].includes(i))
            this.drumSamples.get(drum).start();
        }
      },
      sequencerTrigs,
      "16n"
    );

    this.Sequence.start(startAt);
  };

  changePattern = (pattern) => {
    const defaultPatterns = this.props.sequencer.defaultPatterns;
    const patterns = defaultPatterns;
    const { timestamp, name, index, bpm, ...sequence } = patterns[pattern];
    this.sequence = sequence;
    this.props.changePattern({ sequence, bpm, name, index });
  };

  updateChannelSequence = (action, sound, i) => {
    const { sequence } = this.props;
    let individualSeq = [...sequence[sound]];

    if (action === "ADD") {
      individualSeq.push(i);
    } else if (action === "REMOVE") {
      const stepToRemove = individualSeq.indexOf(i);
      individualSeq.splice(stepToRemove, 1);
    } else {
      individualSeq.length = 0;
    }

    this.sequence = {
      ...this.sequence,
      [sound]: individualSeq,
    };

    this.props.updateSequence({
      key: sound,
      steps: individualSeq,
    });
  };

  playStop = () => {
    this.startSequence();
    !this.props.play ? this.Tone.Transport.start() : this.Tone.Transport.stop();
    this.props.updateSequencerStatus({ play: !this.props.play });
  };

  handleVolume = (newValue) => {
    let newVolume = parseInt(newValue, 10);

    newVolume < 100
      ? (newVolume = parseInt((-50 / (newVolume + 1)) * 10, 10))
      : (newVolume = 0);

    this.Tone.Master.volume.value = newVolume;
  };

  handleBpm = (newValue) => {
    this.props.changeBpbm(newValue);
  };

  handleValues = (newValue, parameters = []) => {
    const effectKey = parameters[0];
    const effectValue = this[parameters[1]];

    const valuedParameters = [
      "frequency",
      "Q",
      "wet",
      "feedback",
      "delayTime",
      "dampening",
      "roomSize",
    ];
    const centValue = [
      "distortion",
      "wet",
      "feedback",
      "delayTime",
      "roomSize",
    ];

    if (centValue.includes(effectKey)) {
      newValue = newValue / 100;
    }

    const chooseNextAction = !valuedParameters.includes(effectKey);

    chooseNextAction
      ? (effectValue[effectKey] = newValue)
      : (effectValue[effectKey].value = parseFloat(newValue));

    this[effectKey] = effectValue;
  };

  render() {
    return (
      <Box
        height="-webkit-fill-available"
        alignItems="center"
        width="100%"
        bg="gray.9"
        justifyContent="center"
      >
        <DrumMachine
          play={this.props.play}
          sequence={this.props.sequence}
          patternName={this.props.patternName}
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
