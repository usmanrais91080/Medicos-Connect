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
        textAlign: "left",
        fontSize: 14,
        fontFamily: themeStyle.FONT_MEDIUM
    },
    textStyle: {
        fontFamily: themeStyle.FONT_REGULAR,
    },
    buttonContainer: {
        padding: "5%",
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: '5%',
        borderColor: '#959FAE'
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
 
})