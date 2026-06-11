import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 0.9,
    },
    heading: {
        // marginTop: "5%",
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16
    },
    btnContainer: {
        // flex: 0.5,
        justifyContent: "flex-end",
        marginTop: "15%",
        marginHorizontal: "10%"
    },
    rowContainer2: {
        marginTop: "1%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    rowContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    heading2: {
        marginTop: "5%",
        color: themeStyle.PINK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20
    },
    desc: {
        marginTop: "5%",
        // marginHorizontal: '5%',
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16
    },
    textContainer: {
        backgroundColor: themeStyle.SPANISH_PINK,
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        alignItems: "center",
        borderRadius: 25
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
    },
    textContainer1: {
        backgroundColor: 'white',
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        alignItems: "center",
        borderRadius: 25,
        borderWidth:1,
        borderColor:themeStyle.SPANISH_PINK
    },
    desc1: {
        marginHorizontal: '2.5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 14
    },
    inputConttainer: {
        marginTop: "2.5%",
        height: 50,
        paddingHorizontal: "2.5%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
    },
    inputConttainer1: {
        marginTop: "5%",
        // backgroundColor: themeStyle.COLOR_WHITE,
        // borderRadius: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SCREEN_WIDTH * 0.9,
        paddingTop: "5%",
    },
    darkDash: {
        backgroundColor: themeStyle.PINK,
        width: 58,
        height: 5, borderRadius: 5
    },
    lightDash: {
        backgroundColor: themeStyle.SPANISH_PINK,
        width: 58,
        height: 5, borderRadius: 5
    },
    minusContainer: {
        position: "absolute",
        zIndex: 1000,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        top: 5,
        left: '100%'
    },
    modalContainer: {
        padding: "5%",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 15,
    },
    grayText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    grayText1: {
        color: "#959FAE",
        textAlign: 'left',
        // marginTop: "15%",
        fontSize: 18,
        // marginBottom: "5%",
        fontFamily: themeStyle.FONT_MEDIUM
    },
    grayText2: {
        color: "#959FAE",
        textAlign: 'left',
        // marginTop: "15%",
        fontSize: 12,
        // marginBottom: "5%",
        fontFamily: themeStyle.FONT_MEDIUM
    },
    linkText: {
        color: "#000000",
        textAlign: "center",
        fontSize: 14,
        fontFamily: themeStyle.FONT_BOLD
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
    margin: {
        marginHorizontal: '3%',
        marginTop: '5%'
    },
})