import { StyleSheet } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';
import { SCREEN_WIDTH } from '../../lib/utils/constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeStyle.COLOR_WHITE,
          paddingTop: "20%"
    },
    logoContainer: {
        flexDirection: "row",
        paddingHorizontal: "5%",
        // marginTop: "10%"
    },
    svgContainer: {
        marginTop: "10%",
        marginHorizontal: "7.5%",
        justifyContent: "center",
        alignItems: "center"
    },
    mainTextStyle: {
        marginTop: "5%",
        textAlign: "center",
        fontSize: 20,
        color: themeStyle.COLOR_BLACK
    },
    checkboxContainer: {
        marginTop: "10%",
        flexDirection: "row",
        backgroundColor: "#EEEEEE",
        paddingHorizontal: "5%",
        paddingVertical: "2.5%",

    },
    textStyle: {
        flex:0.99,
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 20,
        marginLeft: "2.5%",
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_BLACK
    },
    buttonContainer: {
        marginHorizontal: "5%",
        marginTop: "10%"
    }

});
