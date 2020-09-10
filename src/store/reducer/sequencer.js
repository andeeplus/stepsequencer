import {
  UPDATE_SEQUENCE,
  CHANGE_PATTERN,
  SAVE_PATTERN,
  SET_INDEX,
  CHANGE_PATTERN_NAME,
  CHANGE_BPM,
  UPDATE_SEQUENCER_STATUS,
  UPDATE_EFFECT_STATUS,
} from "../actions/sequencerActions";
import { defaultPatterns } from "../../presets/drums";
import cloneDeep from "lodash/cloneDeep";

// TODO Fix initial state and split state

const initialState = () => {
  let userPatterns = localStorage.getItem("userPatterns");
  userPatterns = JSON.parse(userPatterns);

  const { name, timestamp, index, bpm, ...sequence } =
    (userPatterns && userPatterns[0]) || defaultPatterns[0];

  return {
    steps: 16,
    play: false,
    timing: "16n",
    bpm: userPatterns
      ? userPatterns && userPatterns[0] && userPatterns[0].bpm
      : defaultPatterns.length && defaultPatterns[0].bpm,
    masterVolume: -6,
    volumeKnob: -6,
    index,
    sequence: cloneDeep(sequence),
    patternName: name,
    defaultPatterns: userPatterns ? userPatterns : defaultPatterns,
    effects: {
      status: {
        ppDelay: false,
        phaser: false,
        distortion: true,
        reducer: false,
        reverb: false,
      },
    },
  };
};

const sequencer = (state = initialState(), action) => {

  switch (action.type) {
    case SET_INDEX:
      return {
        ...state,
        index: action.index,
      };

    case UPDATE_SEQUENCER_STATUS:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_EFFECT_STATUS:
      return {
        ...state,
        effects: {
          ...state.effects,
          status: {
            ...state.effects.status,
            [action.name]: action.status
          }
        }
      };

    case UPDATE_SEQUENCE:
      return {
        ...state,
        sequence: {
          ...state.sequence,
          [action.sequence.key]: action.sequence.steps,
        },
      };

    case CHANGE_PATTERN:
      return {
        ...state,
        sequence: {
          ...action.sequence,
        },
        bpm: action.bpm,
        patternName: action.name,
        index: action.index,
      };

    case CHANGE_PATTERN_NAME:
      let defaultPatternsUpdatedName = state.defaultPatterns;
      defaultPatternsUpdatedName[state.index].name = action.patternName;

      return {
        ...state,
        patternName: action.patternName,
        defaultPatterns: defaultPatternsUpdatedName,
      };

    case CHANGE_BPM:
      let defaultPatternsUpdatedBpm = state.defaultPatterns;
      defaultPatternsUpdatedBpm[state.index].bpm = action.bpm;
      return {
        ...state,
        bpm: action.bpm,
        defaultPatterns: defaultPatternsUpdatedBpm,
      };
    case SAVE_PATTERN:
      let defaultPatterns = state.defaultPatterns;
      defaultPatterns[state.index] = action.patternToSave;

      const userData = JSON.stringify(defaultPatterns);
      localStorage.setItem("userPatterns", userData);

      return {
        ...state,
        defaultPatterns,
      };
    default:
      return state;
  }
};

export { sequencer };
