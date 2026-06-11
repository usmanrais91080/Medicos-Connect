import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    container: {
        flex: 1,
        paddingTop: "5%"
    },

    headingContainer: {
        marginHorizontal: "5%"
    },
    headingText: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20,
    },
    headingText1: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 14,
    },
    tagLineText: {
        marginTop: 10,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10.5,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    cardContainer: {
        backgroundColor: 'lightgray',
        margin: '5%', padding: '5%',
        borderRadius: 10
    },
    tagLineText2: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10.5,
        marginLeft: 10,
        color: themeStyle.PRIMARY_TINT_COLOR,
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: "5%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    btnContainer: {
        borderRadius: 10,
        paddingVertical: "2.5%",
        paddingHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themeStyle.BUTTON_COLOR
    },
    btnText: {
        color: 'white',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12,
    },
    buttonContainer: {
        marginTop: "10%",
        marginHorizontal: "5%"
    }



})