



const bottomTabTheme = theme => {
    return dispatch => {
        dispatch({ type: "THEME", theme: theme });
    };
};



export const bottomTabActions = {
    bottomTabTheme
};