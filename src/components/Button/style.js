import { StyleSheet, Dimensions } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

const screenWidth = Dimensions.get('window').width;
export default StyleSheet.create({
    btnPrimary: {
        height: 51,
        borderRadius: 12,
        backgroundColor: themeStyle.BUTTON_COLOR,
        // marginTop: "5%"
    },
    btnPrimaryText: {
        fontSize: 18,
        color: 'white',
        fontFamily:themeStyle.FONT_REGULAR
    },
    clearBtnPrimary: {
        height: 44,
        width: 100,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: themeStyle.PRIMARY_BACKGROUND_COLOR,
        backgroundColor: 'white'
    },
    clearBtnPrimaryText: {
        fontSize: 14,
        color: themeStyle.PRIMARY_BACKGROUND_COLOR,
    },
    colorBtnPrimary: {
        height: 51,
        borderRadius: 12,
        backgroundColor: themeStyle.BAR_COLOR
    },
    colorBtnPrimaryText: {
        fontSize: 14,
        fontWeight: "normal",
        color: "white",
    },
    iconContainerStyle: {
        marginHorizontal: 0
    },
});