import { 
    UPDATE_SEQUENCE, 
    SET_INIT_SEQUENCER ,
    CHANGE_PATTERN,
    SAVE_PATTERN,
    SET_INDEX,
    CHANGE_PATTERN_NAME
} from '../actions/sequencerActions'

const sequencer = (state = {}, action) => {
    
    switch (action.type) {

        case SET_INIT_SEQUENCER:
            return { ...state, ...action.sequencer};

        case SET_INDEX:
            return {
                ...state,
                index: action.index
            };

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