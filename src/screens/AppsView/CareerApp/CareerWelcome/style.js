import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    svgContainer: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer: {
        flex: 0.2,
        justifyContent: "flex-start",
        // marginTop: "10%",
        marginHorizontal: "5%"
    },
    textContainer: {
        flex: 0.3,
        justifyContent: "center",
        // marginTop: "10%",
        marginHorizontal: "10%"
    },
    heading: {
        color: themeStyle.CARRER_PRIMARY,
        textAlign: "center",
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 23
    },
    desc: {
        marginTop: "1%",
        color: themeStyle.COLOR_BLACK,
        textAlign: "center",
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12,
        // paddingHorizontal: "7%"
    }
})