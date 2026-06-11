import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    justifyCenter: {
        flex: 0.8,
        marginHorizontal: "16%",
        justifyContent: "center",
        alignItems: "center"
    },
    justifyEnd: {
       
        marginHorizontal: "10%",
        justifyContent: "center",
    },
    heading: {
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontSize: 22,
        fontFamily: themeStyle.FONT_REGULAR
    },
    desc: {
        marginTop: "5%",
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontSize: 14,
        textAlign: "center",
        fontFamily: themeStyle.FONT_REGULAR
    }
})