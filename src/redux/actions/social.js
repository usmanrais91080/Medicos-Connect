
import {
    SOCIAL_STORIES
} from '../types';



const socialStories = storiesData => {
    return dispatch => {
        dispatch({ type: SOCIAL_STORIES, stories: storiesData });
    };
};



export const socialActions = {
    socialStories
};