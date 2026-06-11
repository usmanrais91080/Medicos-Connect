import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 0.79
    },
    heading: {
        color: "#1DD1A1",
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 22
    },
    btnContainer: {
        marginHorizontal: "10%"
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
    inputConttainer: {
        marginVertical: "2.5%",
        // backgroundColor: themeStyle.COLOR_WHITE,
        // borderRadius: 10,
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
    },
    darkDash: {
        backgroundColor: themeStyle.PRIMARY_TINT_COLOR,
        width: 100,
        height: 5, borderRadius: 5
    },
    lightDash: {
        backgroundColor: "lightgray", width: 100,
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
    grayText: {
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    greenText: {
        marginTop: "5%",
        color: '#1DD1A1',
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 12
    },
    rowContainer: {
        marginTop: "5%",
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
        borderRadius: 3,
        backgroundColor: themeStyle.BUTTON_COLOR
    },
    rowContainer1: {
        flexDirection: "row",
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
        backgroundColor: 'white'
    },
    dropDownContainerStyle: {
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
    },
    dropDownContainer: {
        width: 150, height: 40,
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
        // fontSize: 12,
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,

    },
    desc1: {
        marginLeft: '5%',
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10
    },
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    margin: {
        marginTop: "5%",
        // marginHorizontal: "3%"
    },
})