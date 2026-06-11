import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "5%"
    },
    heading: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20,
        marginBottom: '5%',
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    headingContainer: {
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
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
    },
    buttonContainer: {
        marginTop: "5%",
        marginHorizontal: '5%',
        width: "50%"
    }
})