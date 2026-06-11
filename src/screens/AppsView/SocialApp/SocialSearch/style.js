import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

export default StyleSheet.create({
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    headerBtn: {
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: themeStyle.BAR_COLOR,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    btnText: {
        color: themeStyle.COLOR_WHITE,
        fontSize: 12,
        marginLeft: 10,
        fontFamily: themeStyle.FONT_REGULAR
    },
})