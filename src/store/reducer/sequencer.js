import { 
    UPDATE_SEQUENCE, 
    SET_INIT_SEQUENCER ,
    CHANGE_PATTERN
} from '../actions/sequencerActions'

const sequencer = (state = {}, action) => {
    switch (action.type) {
        case SET_INIT_SEQUENCER:
                return { ...state, ...action.sequencer};
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
        default:
            return state;
    }
};

export { sequencer }