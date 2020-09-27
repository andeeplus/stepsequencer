import {
  UPDATE_SEQUENCE,
  CHANGE_PATTERN,
  SAVE_PATTERN,
  SET_INDEX,
  CHANGE_PATTERN_NAME,
  CHANGE_BPM,
  UPDATE_SEQUENCER_STATUS,
  UPDATE_EFFECT_STATUS,
  UPDATE_EFFECT_STATE,
  UPDATE_EFFECT_VALUE,
  SET_INITIAL_STATE,
} from "../actions/sequencerActions";
import { defaultPatterns } from "../../presets/drums";
import { initFX } from "tone/effects";

// TODO Fix initial state and split state

const initialState = () => {
  const initialPattern = defaultPatterns[0];
  const { name, timestamp, index, bpm, ...sequence } = initialPattern;

  return {
    steps: 16,
    play: false,
    timing: "16n",
    bpm: defaultPatterns[0].bpm,
    masterVolume: -6,
    volumeKnob: -6,
    index,
    sequence: sequence,
    patternName: name,
    defaultPatterns: defaultPatterns,
    effects: {
      state: initFX,
      status: {
        ppDelay: false,
        phaser: false,
        distortion: false,
        bitReducer: false,
        reverb: false,
      },
    },
  };
};

const sequencer = (state = initialState(), action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return {
        ...state,
        ...action.state,
      };
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
            [action.name]: action.status,
          },
        },
      };

    case UPDATE_EFFECT_STATE:
      return {
        ...state,
        effects: {
          ...state.effects,
          state: {
            ...state.effects.state,
            [action.name]: action.fxState,
          },
        },
      };

    case UPDATE_EFFECT_VALUE:
     return {
        ...state,
        effects: {
          ...state.effects,
          state: {
            ...state.effects.state,
            [action.name]: {
              ...state.effects.state[action.name],
              [action.paramName]: action.value
            },
          },
        },
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
      const updatedPatterns = state.defaultPatterns;
      let effects = state.effects;
      updatedPatterns[state.index] = action.patternToSave;

      const dmachine = JSON.stringify({
        dmachine: { defaultPatterns: updatedPatterns, effects },
      });
      localStorage.setItem("dmachine", dmachine);

      return {
        ...state,
        defaultPatterns,
      };
    default:
      return state;
  }
};

export { sequencer };
