import { StyleSheet } from 'react-native';
import THEME from '../../assets/styles/theme.style';
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.PRIMARY_BACKGROUND_COLOR,
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyle: {
        height: 300,
    },
    textStyle: {
        color: THEME.COLOR_BLACK
    }
})