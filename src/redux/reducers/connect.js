import {
    CONNECT_INTERESTS_SUCCESS,
    CONNECT_MODES_SUCCESS,
    CONNECT_PERSONALJUDGEMENT_SUCCESS,
    CONNECT_PROFESSIONS_SUCCESS
} from '../types';

const initialState = {
    hobbies: [],
    lifestyles: [],
    personalities: [],
    likes: [],
    connectModes: [],
    connectProfessions: [],
    connectPersonalJudgement:[]
};

const connectReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT_INTERESTS_SUCCESS:
            return {
                ...state,
                hobbies: action.hobbies,
                lifestyles: action.lifestyles,
                personalities: action.personalities,
                likes: action.likes
            };

        case CONNECT_MODES_SUCCESS:
            return {
                ...state,
                connectModes: action.modes
            };
        case CONNECT_PERSONALJUDGEMENT_SUCCESS:
            return {
                ...state,
                connectPersonalJudgement: action.professions
            };
        case CONNECT_PROFESSIONS_SUCCESS:
            return {
                ...state,
                connectProfessions: action.professions
            };

        default:
            return state;
    }
};

export default connectReducer;
