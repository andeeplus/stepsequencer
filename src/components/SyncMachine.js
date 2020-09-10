import React, { Component } from "react";
import { connect } from "react-redux";
import Tone from "tone";
import { initFX, drumIds } from "../presets/drums";
import { eightOeight } from "../tone/samples/drums";
import DrumMachine from "./DrumMachine";
import {
  UPDATE_SEQUENCE,
  CHANGE_BPM,
  CHANGE_PATTERN,
  UPDATE_SEQUENCER_STATUS,
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
});

const mapDispatchToProps = (dispatch) => ({
  updateSequence: (sequence) => dispatch({ type: UPDATE_SEQUENCE, sequence }),
  changePattern: ({ sequence, bpm, name, index }) =>
    dispatch({ type: CHANGE_PATTERN, sequence, bpm, name, index }),
  changeBpm: (bpm) => dispatch({ type: CHANGE_BPM, bpm }),
  updateSequencerStatus: (payload) =>
    dispatch({ type: UPDATE_SEQUENCER_STATUS, payload }),
});

class SyncMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timing: "16n",
      audioContextIsActive: false,
      indexSeq: 0,
    };
    this.distorsion = null;
    this.sequence = props.sequence;
    this.phaser = null;
    this.drumvol = null;
    this.bitCrusher = null;
    this.ppDelay = null;
    this.reverb = null;
    this.Sequence = null;
    this.indexSeq = 0;
    this.drumSamples = eightOeight;
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

    this.reviewEffectStatus(prevProps);
  }

  reviewEffectStatus = (prevProps) => {

    if (this.props.fxStatus.ppDelay !== prevProps.fxStatus.ppDelay) {
      if (this.props.fxStatus.ppDelay) {
        this.ppDelay.wet.value = 1;
      } else this.ppDelay.wet.value = 0;
    }

    if (this.props.fxStatus.distorsion !== prevProps.fxStatus.distorsion) {
      if (this.props.fxStatus.distorsion) {
        this.distorsion.wet.value = 1;
      } else {
        this.distorsion.wet.value = 0;
      }
    }

    if (this.props.fxStatus.distorsion !== prevProps.fxStatus.distorsion) {
      if (this.props.fxStatus.distorsion) {
        this.bitCrusher.wet.value = 1;
      } else {
        this.bitCrusher.wet.value = 0;
      }
    }

    if (this.props.fxStatus.phaser !== prevProps.fxStatus.phaser) {
      if (this.props.fxStatus.phaser) {
        this.phaser.wet.value = 1;
      } else this.phaser.wet.value = 0;
    }

    if (this.props.fxStatus.reverb !== prevProps.fxStatus.reverb) {
      if (this.props.fxStatus.reverb) {
        this.reverb.wet.value = 1;
      } else this.reverb.wet.value = 0;
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
    this.distorsion = new Tone.Distortion(initFX.distortion);
    this.phaser = new Tone.Phaser(initFX.phaser);
    this.bitCrusher = new Tone.BitCrusher(initFX.bitCrusher);
    this.ppDelay = new Tone.PingPongDelay(initFX.ppDelay);
    this.reverb = new Tone.Freeverb(initFX.reverb);
    this.drumVol = new Tone.Volume(this.props.masterVolume);

    this.distorsion.wet.value = this.props.fxStatus.distorsion ? 1 : 0;
    this.phaser.wet.value = this.props.fxStatus.phaser ? 1 : 0;
    this.bitCrusher.wet.value = this.props.fxStatus.bitCrusher ? 1 : 0;
    this.ppDelay.wet.value = this.props.fxStatus.ppDelay ? 1 : 0;
    this.reverb.wet.value = this.props.fxStatus.reverb ? 1 : 0;
  };

  activateAudioContext = async () => {
    await this.initSetup();
    await this.initFX();
    this.drumSamples.chain(
      this.distorsion,
      this.phaser,
      this.bitCrusher,
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

    const valuedParameters = ["frequency", "Q", "wet", "feedback", "delayTime", "dampening","roomSize"];
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
      : (effectValue[effectKey].value = newValue);

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
