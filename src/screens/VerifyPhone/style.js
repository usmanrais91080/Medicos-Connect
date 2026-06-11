import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

export default StyleSheet.create({
    upperContainer: {
        position:'absolute',
    },
    lowerContainer: {
        flex: 1, justifyContent: "flex-end", elevation: 2,paddingTop:'30%'
    },
    modalContainer: {
        padding: "5%",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    grayText: {
        textAlign: "center",
        color: '#959FAE',
        fontSize: 14,
        marginVertical: "5%",
        fontFamily: themeStyle.FONT_MEDIUM
    },
    linkText: {
        textAlign: "center",
        fontSize: 14,
        color: themeStyle.BAR_COLOR,
        fontFamily: themeStyle.FONT_MEDIUM,
        textDecorationLine: "underline"
    },
    textStyle: {
        fontFamily: themeStyle.FONT_REGULAR,
    },
    buttonContainer: {
        marginTop: "25%", marginBottom: "10%"
    },
    selectedButtonContainer: {
        padding: "5%",
        borderWidth: 0.5,
        backgroundColor: '#959FAE',
        borderRadius: 10,
        marginTop: '5%',
        borderColor: '#959FAE'
    },
    textContainer: {
        justifyContent: "flex-start",
        marginTop: "5%",
        marginBottom: "15%"
    },
    inputContainer: {
        alignSelf: "center", marginTop: "5%"
    }
})