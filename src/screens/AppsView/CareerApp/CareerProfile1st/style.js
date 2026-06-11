import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 22
    },
    btnContainer: {
        flex: 0.5,
        justifyContent: "flex-end",
        // marginTop: "15%",
        marginHorizontal: "5%"
    },
    rowContainer2: {
        marginTop: "15%",
        marginBottom: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    desc: {
        marginTop: "5%",
        // marginHorizontal: '5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    desc2: {
        marginBottom: "2.5%",
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    inputConttainer: {
        marginTop: "2.5%",
        // backgroundColor: themeStyle.COLOR_WHITE,
        // borderRadius: 10,
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
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
    grayText: {
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    rowContainer: {
        marginTop: "2.5%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    textContainer: {
        backgroundColor: themeStyle.BUTTON_COLOR,
        padding: 10,
        borderRadius: 10
    },
    box: {
        height: 19,
        width: 19,
        borderRadius: 3,
        backgroundColor: 'lightgray'
    },
    selectedbox: {
        height: 19,
        width: 19,
        borderColor: "white",
        borderWidth: 2,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: themeStyle.COLOR_LIGHT_GREY
    },
    rowContainer1: {
        flexDirection: "row",
        marginTop: "5%",
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

    option: {
        marginLeft: 10,
        fontSize: 12,
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
    },
    selectedOption: {
        marginLeft: 10,
        fontSize: 12,
        color: themeStyle.BUTTON_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
    },
    headingText: {
        marginVertical: '2.5%',
        fontSize: 12,
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,

    },
    headingText2: {
        marginBottom: '0.5%',
        fontSize: 12,
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_MEDIUM,

    },
    desc1: {
        marginHorizontal: '2.5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 14
    },
    inputConttainer1: {
        marginTop: "2.5%",
        height: 50,
        paddingHorizontal: "2.5%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
    },
    margin: {
        marginVertical: 10
    },
    btnSelect: {
        height: 40,
        borderRadius: 5,
        backgroundColor: themeStyle.CARRER_SECONDARY,
        marginTop: "1%"
    },
    btnDisable: {
        height: 40,
        borderRadius: 5,
        backgroundColor: themeStyle.CARRER_DISABLE_BUTTON,
        marginTop: "1%"
    },
    btnPrimaryText: {
        color: themeStyle.COLOR_BLACK,
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR
    },
})