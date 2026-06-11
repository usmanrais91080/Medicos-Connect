import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    headerTextStyle: {
        fontSize: 22,
        color: themeStyle.COLOR_WHITE,
        fontFamily: themeStyle.FONT_BOLD
    },
    datingStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: "5%",
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: '#FF6B6B',
    },
    headingStyle: {
        color: 'white',
        fontSize: 12
    },
    container: {
        flex: 1,
        backgroundColor: themeStyle.COLOR_WHITE
    },
    headingContainer: {
        marginTop: "5%",
        marginHorizontal: "5%"
    },
    headingText: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 22,
        color: themeStyle.COLOR_BLACK
    },
    itemContainer: {
        padding: "2.5%",
        backgroundColor: themeStyle.WHITE_SMOKE,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.00,
        elevation: 1
    },
    rowStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    rowContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rejectButton: {
        width: SCREEN_WIDTH * 0.415,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor:themeStyle.SPANISH_PINK
    },
    chatButton: {
        width: SCREEN_WIDTH * 0.415,
        height: 40,
        backgroundColor: themeStyle.SPANISH_PINK,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    nameText: {
        fontSize: 18,
        textTransform:"capitalize",
        fontFamily: themeStyle.FONT_MEDIUM,
        color: themeStyle.COLOR_BLACK,
    },
    grayText: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_BLACK,
    },
    whiteText: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_WHITE
    },
    profileBtn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        height: 40,
        backgroundColor: themeStyle.SPANISH_PINK,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    }
})