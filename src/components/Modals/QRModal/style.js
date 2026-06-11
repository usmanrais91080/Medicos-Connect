import { StyleSheet } from "react-native";
import themeStyle from "../../../assets/styles/theme.style";

export default StyleSheet.create({
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    headerBtn: {
        borderRadius: 10, flexDirection: "row", alignItems: "center", backgroundColor: themeStyle.BAR_COLOR, paddingHorizontal: 15, paddingVertical: 5
    },
    btnText: { color: themeStyle.COLOR_WHITE, fontSize: 12, marginLeft: 10, fontFamily: themeStyle.FONT_REGULAR },
    menuheading: {
        color: '#38474F',
        marginLeft: 20,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 22
    },
    menuContainer: { flexDirection: "row", alignItems: "center", marginTop: "10%", marginLeft: 10, paddingBottom: "5%", borderBottomWidth: 0.3 },
    rowContainer: {
        flexDirection: "row",
        marginTop: "10%",
        alignItems: "center",
        marginLeft: "10%"
    },
    rowContainer1: {
        flexDirection: "row",
        backgroundColor: "#FF6B6B",
        borderRadius: 10,
        height: 50,
        paddingHorizontal: "5%",
        marginRight: "32%",
        marginTop: "10%",
        alignItems: "center",
        marginLeft: "5%"
    },
    chooseModeContainer: {
        flexDirection: "row",
        overflow: "hidden",
        marginLeft: "5%",
        marginRight: "5%",
        backgroundColor: '#e9e9e9',
        borderRadius: 10
    },
    selectedStyle: {
        backgroundColor: "#FF6B6B",
        paddingHorizontal: '16.5%',
        margin: 5,
        borderRadius: 10,
        paddingVertical: "5%",
        justifyContent: "center",
        alignItems: "center"
    },
    unSelectedStyle: {
        paddingHorizontal: '16.5%',
        margin: 5,
        borderRadius: 10,
        paddingVertical: "5%",
        justifyContent: "center",
        alignItems: "center"
    },
    chooseContainer: {
        marginTop: "10%",
    },
    chooseText: {
        color: '#38474F',
        marginLeft: '5%',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 18
    },
    choosedText: {
        color: themeStyle.COLOR_WHITE,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 14
    },
    unChoosedText: {
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 14
    },
    nameText: {
        fontFamily: themeStyle.FONT_MEDIUM
    },
    nameText1: {
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    itemText: {
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.PRIMARY_TINT_COLOR
    },
    itemText1: {
        fontSize: 16,
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_WHITE
    },
    rowContainer2: {
        marginTop: "10%",
        justifyContent: "flex-end",
        marginLeft: "10%"
    },
})