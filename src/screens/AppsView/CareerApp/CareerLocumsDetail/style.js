import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

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
    cardContainer: {
        flex: 1,
        backgroundColor: themeStyle.COLOR_WHITE,
        padding: "5%",
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    avatarContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    rowStyle: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    rowContainer1: {
        marginVertical: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    viewStyle: {
        flex: 0.33,
        height: 40,
        marginHorizontal: 3,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        marginTop: '5%',
        fontSize: 22,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    titleText1: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    gap: {
        width: 15
    },
    designationText: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    headingText: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#38474F'
    },
    colorHeadingText: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_MEDIUM,
        color: '#1DD1A1',
        textDecorationLine: "underline"
    },
    colorHeadingText1: {
        fontSize: 18,
        fontFamily: themeStyle.FONT_MEDIUM,
        color: '#1DD1A1',
    },
    colorText: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#1DD1A1',
    },
    descText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    btnContainer: {
        flex: 0.2,
        elevation: 5,
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: "5%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    btonContainer: {
        marginVertical: "2.5%",
        backgroundColor: "#1DD1A1",
        height: 50,
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    whiteText: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_REGULAR,
        color: 'white',
    }


})