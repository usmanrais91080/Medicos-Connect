import { StyleSheet } from "react-native";
import themeStyle from "../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        backgroundColor: themeStyle.COLOR_MENTAL,
        borderRadius: 10,
        paddingVertical: "8%",
        paddingHorizontal: "5%",
        flexDirection:'row',
        justifyContent:'space-between'
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
        flexDirection: "row",
        height: 30,
        width: 124,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        backgroundColor:themeStyle.EDUCATION_BROWN
    },
    btnContainer2: {
        marginTop: "2.5%",
        height: 30,
        width: SCREEN_WIDTH * 0.4,
        backgroundColor: "#E9E9E9",
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
    grayTextStyle1: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    grayText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    blackText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_BLACK
    },
    colorText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#99CC66'
    },
    textStyle: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_BLACK,
        marginBottom:5
    }
})