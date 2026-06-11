import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        marginTop: "5%",
        color: themeStyle.PINK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20
    },
    headingText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 26
    },
    heading1: {
        // marginTop: "5%",
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 18
    },
    btnContainer: {
        justifyContent: "flex-end",
        marginTop: "5%",
        marginHorizontal: "10%"
    },
    rowContainer: {
        // marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowContainer2: {
        marginTop: "15%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    margin: {
        marginTop: "5%",
        marginHorizontal: "3%"
    },
    desc: {
        // marginTop: "5%",
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16
    },
    grayText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    textContainer: {
        backgroundColor: '#F2B6B6',
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        alignItems: "center",
        borderRadius: 25
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SCREEN_WIDTH * 0.95,
        paddingTop: "5%",
    },
    textContainer1: {
        backgroundColor: 'white',
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        alignItems: "center",
        borderRadius: 25,
        borderWidth:1,
        borderColor:"#F2B6B6"
    },
    whiteText: {
        color: themeStyle.COLOR_BLACK, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
    },
    inputConttainer: {
        marginTop: "5%",
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