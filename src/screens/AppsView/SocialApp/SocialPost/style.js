import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";


export default StyleSheet.create({
    container: {
        flex: 0.75,
        paddingTop: "5%"
    },
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    heading: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    headingContainer: {
        marginTop: '5%',
        marginHorizontal: "5%"
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE, fontFamily: themeStyle.FONT_REGULAR, fontSize: 12
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
    textContainer: {
        backgroundColor: themeStyle.BUTTON_COLOR,
        padding: 10,
        borderRadius: 10
    },
    containerStyle: {
        height: 110,
        marginBottom: 0
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#F2F3F5',
        borderRadius: 5,
        height: 100,
    },
    inputStyle: {
        height: 110,
        textAlignVertical: "top",
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        marginLeft: '2.5%'
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
        borderRadius: 3,
        backgroundColor: themeStyle.BUTTON_COLOR
    },
    rowContainer: {
        flexDirection: "row",
    },
    row: {
        flex: 0.37,
        flexDirection: "row",
        alignItems: "center",
    },
    margin: {
        marginLeft: "5%",

    },
    option: {
        marginLeft: 10,
        fontSize: 12,
        color: themeStyle.COLOR_WHITE,
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
    buttonContainer: {
        marginTop: "5%",
        marginHorizontal: '5%',
    },
    addMediaStyle: {
        flexDirection: "row",
        marginTop: '5%',
        padding: '5%',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: themeStyle.BUTTON_COLOR
    },
    btnContainer: {
        justifyContent: "flex-end",
        marginTop: "5%",
        marginHorizontal: "10%"
    },
    rowContainer2: {
        marginTop: "15%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    darkDash: {
        backgroundColor: themeStyle.BUTTON_COLOR,
        width: 58,
        height: 5, borderRadius: 5
    },
    lightDash: {
        backgroundColor: "lightgray",
        width: 58,
        height: 5, borderRadius: 5
    },
    contentContainer: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        width: SCREEN_WIDTH,
        // paddingTop: "5%",
        marginVertical: "2%",
        paddingHorizontal:SCREEN_WIDTH*0.02
    },
})