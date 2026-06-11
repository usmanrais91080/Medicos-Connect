import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    headingText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 26
    },
    heading: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16
    },
    selectedOption: {
        height: 40,
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: "#F2B6B6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    unSelectedOption: {
        height: 40,
        borderWidth:1,
        borderColor:"#F2B6B6",
        // backgroundColor: 'lightgray',
        width: SCREEN_WIDTH * 0.3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    tagline: {
        marginTop: "5%",
        alignItems: "center",
    },
    tagLineText: {
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontSize: 10,
        fontFamily: themeStyle.FONT_REGULAR

    },
    btnContainer: {
        justifyContent: "flex-end",
        marginVertical: "5%",
        marginHorizontal: "10%"
    },
    rowContainer2: {
        marginTop: "15%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    rowContainer: {
        marginHorizontal: '3%',
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SCREEN_WIDTH,
        paddingVertical: "5%",
        paddingLeft: "2.5%"
    },
    desc: {
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10
    },
    desc1: {
        marginLeft: '5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10
    },
    textContainer: {
        backgroundColor: themeStyle.BUTTON_COLOR,
        padding: 10,
        borderRadius: 10
    },
    whiteText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    grayText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    inputConttainer: {
        marginTop: "2.5%",
        marginBottom: "7.5%"
        // backgroundColor: themeStyle.COLOR_WHITE,
        // borderRadius: 10,
    },
    darkDash: {
        backgroundColor: themeStyle.PINK,
        width: 58,
        height: 5, borderRadius: 5
    },
    lightDash: {
        backgroundColor: "#F2B6B6",
        width: 58,
        height: 5, borderRadius: 5
    },
    margin: {
        marginTop: "5%",
        marginHorizontal: "3%"
    },
    emptyContainer: {
        backgroundColor: themeStyle.COLOR_WHITE,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        marginHorizontal: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'lightgray'
    },
    back: {
        width: SCREEN_WIDTH * 0.415,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: themeStyle.SPANISH_PINK
    },
    next: {
        width: SCREEN_WIDTH * 0.415,
        height: 50,
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: themeStyle.SPANISH_PINK,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})