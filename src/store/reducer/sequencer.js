import { 
    UPDATE_SEQUENCE, 
    CHANGE_PATTERN,
    SAVE_PATTERN,
    SET_INDEX,
    CHANGE_PATTERN_NAME,
    UPDATE_SEQUENCER_STATUS
} from '../actions/sequencerActions'
import { defaultPatterns } from '../../presets/drums'
import cloneDeep from 'lodash/cloneDeep'

const initialState = () => {

    let userPatterns = localStorage.getItem('userPatterns')
    userPatterns = JSON.parse(userPatterns) 

    const {name, timestamp, index, ...sequence} = (userPatterns && userPatterns[0]) || defaultPatterns[0]

    return({
        steps: 16,
        play: false,
        timing: "16n",
        bpm: 120,
        masterVolume: -3,
        volumeKnob: 0,
        index,
        sequence: cloneDeep(sequence),
        patternName: name,
        defaultPatterns: userPatterns ? userPatterns : defaultPatterns
    })
}

const sequencer = (state = initialState(), action) => {

    switch (action.type) {

        case SET_INDEX:
            return {
                ...state,
                index: action.index
            };

        case UPDATE_SEQUENCER_STATUS:
            return {
                ...state,
                ...action.payload
            }

        case UPDATE_SEQUENCE:
            return { 
                ...state, 
                    sequence: {
                        ...state.sequence,
                        [action.sequence.key]: action.sequence.steps
                    }
            };

        case CHANGE_PATTERN:
            return { 
                ...state, 
                    sequence: {
                        ...action.pattern
                    }
            };

        case CHANGE_PATTERN_NAME:
                return { 
                    ...state, 
                        patternName: action.patternName 
            };

        case SAVE_PATTERN:

            let defaultPatterns = [...state.defaultPatterns]
            
            defaultPatterns[state.index] = {...action.patternToSave}

            const userData = JSON.stringify(defaultPatterns)
            localStorage.setItem('userPatterns', userData)
            
                return { 
                    ...state,
                    defaultPatterns
                };
        default:
            return state;
    }
};

export { sequencer }