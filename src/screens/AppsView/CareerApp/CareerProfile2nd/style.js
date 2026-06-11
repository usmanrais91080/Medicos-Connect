import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 22,
        marginBottom: '3%'
    },
    btnContainer: {
        flex: 0.5,
        justifyContent: "flex-end",
        // marginTop: "15%",
        marginHorizontal: "5%"
    },
    rowContainer2: {
        marginTop: "15%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    desc: {
        marginTop: "5%",
        marginHorizontal: '5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    textContainer: {
        backgroundColor: themeStyle.CARRER_SECONDARY,
        padding: 10,
        borderRadius: 10
    },
    whiteText: {
        color: themeStyle.COLOR_BLACK, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
    },
    inputConttainer: {
        marginTop: "2.5%",
        // backgroundColor: themeStyle.COLOR_WHITE,
        // borderRadius: 10,
    },
    inputConttainer2: {
        width: 200

        // backgroundColor: themeStyle.COLOR_WHITE,
        // borderRadius: 10,
    },
    darkDash: {
        backgroundColor: themeStyle.CARRER_SECONDARY,
        width: 50,
        height: 3, borderRadius: 2
    },
    lightDash: {
        backgroundColor: themeStyle.CARRER_PRIMARY, width: 50,
        height: 3, borderRadius: 2
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
    row: {
        flex: 0.37,
        flexDirection: "row",
        alignItems: "center",
    },
    arrowStyle: {
        position: "absolute",
        right: 0,
    },
    dropDownStyle: {
        borderTopColor: 'gray',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: 'lightgray'
    },
    dropDownContainerStyle: {
        backgroundColor: 'lightgray',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
    },
    dropDownContainer: {
        width: 100, height: 40,
    },
    rowContainer: {
        marginTop: "2.5%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    grayText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12,
        marginTop: "2%",
    },
    desc1: {
        marginHorizontal: '2.5%',
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12,
    },
    inputConttainer1: {
        marginTop: "2.5%",
        height: 50,
        paddingHorizontal: "2.5%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "transparent",
        borderRadius: 10,
        borderColor: themeStyle.CARRER_PRIMARY,
        borderWidth: 2
    },
    margin: {
        marginVertical: 10
    },
    margin2: {
        marginVertical: 10,
        width: SCREEN_WIDTH * 0.45
    },
    inputConttainer3: {
        marginTop: "2.5%",
        height: 50,
        paddingHorizontal: "2.5%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
    },
    desc2: {
        paddingHorizontal: '2.5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
})