import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        marginTop: "5%",
        color:themeStyle.PINK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16,
        fontWeight: '400'
    },
    heading1: {
        // marginTop: "5%",
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16,
        fontWeight: '400'
    },
    btnContainer: {
        justifyContent: "flex-end",
        marginTop: "5%",
        marginHorizontal: "10%"
    },
    rowContainer: {
        marginTop: "2%",
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
    desc: {
        marginTop: "5%",
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16,
        fontWeight: '400'
    },
    grayText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12,
        fontWeight: '400'
    },
    textContainer: {
        backgroundColor: themeStyle.SPANISH_PINK,
        paddingVertical: '7%',
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
        backgroundColor: themeStyle.COLOR_WHITE,
        paddingVertical: '7%',
        paddingHorizontal: '5%',
        alignItems: "center",
        borderRadius: 25,
        borderWidth: 2,
        borderColor: themeStyle.SPANISH_PINK
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
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
        backgroundColor:themeStyle.SPANISH_PINK,
        width: 58,
        height: 5, borderRadius: 5
    },
    margin: {
        marginHorizontal: '3%',
        marginTop: '5%'
    },
    headingText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 22,
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
    }
 
})