import { StyleSheet } from "react-native";
import themeStyle from "../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
        padding: "5%"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    btnContainer: {
        marginTop: "2.5%",
        height: 30,
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: "#1DD1A1",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer1: {
        marginTop: "2.5%",
        flexDirection: "row",
        height: 30,
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: "#1DD1A1",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer2: {
        marginTop: "2.5%",
        height: 30,
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: "#38474F",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    rowStyle: {
        flexDirection: "row",
        // alignItems: "center"
    },
    grayTextStyle: {
        fontSize: 10,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    grayText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    whiteText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_WHITE
    },
    colorText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#1DD1A1'
    },
    textStyle: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#313131'
    }
})