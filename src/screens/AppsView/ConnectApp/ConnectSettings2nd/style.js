import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        // marginTop: "5%",
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20
    },
    btnContainer: {
        flex: 0.5,
        justifyContent: "flex-end",
        marginTop: "15%",
        marginHorizontal: "10%"
    },
    rowContainer2: {
        marginTop: "15%",
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
        color: '#FF6B6B',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20
    },
    desc: {
        marginTop: "5%",
        // marginHorizontal: '5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    desc1: {
        marginHorizontal: '2.5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 14
    },
    textContainer: {
        backgroundColor: themeStyle.BUTTON_COLOR,
        padding: 10,
        borderRadius: 10
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
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
    darkDash: {
        backgroundColor: '#FF6B6B',
        width: 100,
        height: 5, borderRadius: 5
    },
    lightDash: {
        backgroundColor: "lightgray",
        width: 100,
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
        color: "#959FAE",
        textAlign: "center",
        fontSize: 14,
        // marginBottom: "5%",
        fontFamily: themeStyle.FONT_BOLD
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
        fontSize: 15,
        // marginBottom: "5%",
        fontFamily: themeStyle.FONT_MEDIUM
    },
    linkText: {
        color: "#000000",
        textAlign: "center",
        fontSize: 14,
        fontFamily: themeStyle.FONT_BOLD
    },
})