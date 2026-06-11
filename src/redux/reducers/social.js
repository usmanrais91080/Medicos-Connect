import {
    SOCIAL_STORIES
} from '../types';

const initialState = {
    stories: [],
};

const socialReducer = (state = initialState, action) => {
    switch(action.type) {
        case SOCIAL_STORIES:
            return {
                ...state,
                stories: action.stories
            };

        default:
            return state;
    }
};

export default socialReducer;
