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
        // backgroundColor: 'lightgray',
        margin: '5%',
        padding: '5%',
        borderRadius: 10
    },
    tagLineText2: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10.5,
        color: '#707070'
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: "5%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    grayText: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    btnContainer: {
        borderRadius: 10,
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'lightgray'
    },
    selectedBtnContainer: {
        marginTop: "5%",
        borderRadius: 10,
        paddingVertical: "5%",
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
    btnText1: {
        color: 'gray',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12,
    },
    buttonContainer: {
        marginTop: "10%",
        marginHorizontal: "5%"
    },
    countryInputContainer: {
        marginTop: "2.5%",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        justifyContent: "center",
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        height: 50
    },
    flagInnerContainer: {
        color: "gray",
        marginHorizontal: "3%",
        // height: 20,
        justifyContent: "center",
        // alignItems: "center"
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: "center",
        // alignItems: "center"
    },
    column1: {
        flex: 0.1,
        flexDirection: 'column',
        // justifyContent: "center",
        alignItems: "center",
        marginRight: '5%'
    },
    flagContainer: {
        flexDirection: "row",
        borderRadius: 5,
        alignItems: "center",
        // justifyContent:"center",
        marginBottom: 10
    },



})