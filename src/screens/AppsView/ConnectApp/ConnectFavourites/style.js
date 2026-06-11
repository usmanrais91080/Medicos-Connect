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
        color: themeStyle.PRIMARY_TINT_COLOR,
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
        flex: 1
    },
    headingContainer: {
        marginTop: "5%",
        marginHorizontal: "5%"
    },
    headingText: {
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 22,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    itemContainer: {
        padding: "2.5%",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10
    },
    rowStyle: {
        flexDirection: "row",
        alignItems: "center"
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
        backgroundColor: '#e9e9e9',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    chatButton: {
        width: SCREEN_WIDTH * 0.415,
        height: 40,
        backgroundColor: '#FF6B6B',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    nameText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: '#313131'
    },
    grayText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    whiteText: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_WHITE
    }
})