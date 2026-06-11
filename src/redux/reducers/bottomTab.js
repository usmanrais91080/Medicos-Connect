import themeStyle from '../../assets/styles/theme.style';

const initialState = {
    theme: {
        activeTintColor: themeStyle.LIGHT_GRAY,
        inactiveTintColor: themeStyle.COLOR_BLACK,
        backgroundColor: themeStyle.COLOR_WHITE,
        iconColor: themeStyle.COLOR_WHITE,
    },
};

const bottomTabReducer = (state = initialState, action) => {
    switch(action.type) {
        case "THEME":
            return {
                ...state,
                theme: action.theme
            };
        default:
            return state;
    }
};

export default bottomTabReducer;
