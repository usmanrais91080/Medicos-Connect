import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    headerBtn: {
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: themeStyle.BAR_COLOR,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    btnText: {
        color: themeStyle.COLOR_WHITE,
        fontSize: 12,
        marginLeft: 10,
        fontFamily: themeStyle.FONT_REGULAR
    },
    container: {
        flex: 1,
    },
    imageStyle: {
        flex: 1,
        justifyContent: "flex-end",
        height: 428,
        width: SCREEN_WIDTH,
    },
    nameText: {
        color: themeStyle.BUTTON_COLOR,
        fontFamily: themeStyle.FONT_REGULAR
    },
    whiteText: {
        marginLeft: 5,
        fontSize: 10,
        color: 'white'
    },
    grayText: {
        fontSize: 10,
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR
    },
    blueText: {
        fontSize: 10,
        color: "blue",
        fontFamily: themeStyle.FONT_REGULAR,
        textDecorationLine: "underline"
    },
    blackText: {
        color: themeStyle.BUTTON_COLOR,
        fontFamily: themeStyle.FONT_BOLD,
    },
    rowContainer: {
        marginHorizontal: '5%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    adContainer: {
        marginVertical: "3%",
        backgroundColor: "white",
        paddingVertical: "5%"
    },
    rowButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: "5%",
        marginBottom: '2.5%'
    },
    centeredContaienr: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    icon_text_style: {
        color: themeStyle.BUTTON_COLOR,
        fontFamily: themeStyle.FONT_REGULAR
    },
    iconStyleClose: {
        paddingLeft: SCREEN_WIDTH * 0.75,
        marginVertical:5
      },
})