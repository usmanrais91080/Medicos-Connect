import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

export default StyleSheet.create({
    upperContainer: {
        flex: 0.5, justifyContent: "center"
    },
    lowerContainer: {
        flex: 0.5, justifyContent: "flex-end", elevation: 2
    },
    modalContainer: {
        padding: "5%",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    grayText: {
        color: "#959FAE",
        textAlign: "left",
        fontSize: 14,
        marginBottom: "5%",
        fontFamily: themeStyle.FONT_REGULAR
    },
    linkText: {
        color: "#0ABDE3",
        textAlign: "center",
        fontSize: 10,
        fontFamily: themeStyle.FONT_REGULAR
    },
    textContainer: {
        justifyContent: "flex-start",
        marginTop: "5%",
        marginBottom: "15%"
    },

})