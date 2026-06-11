import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

export default StyleSheet.create({
    container: {
        flex: 0.7
    },
    svgContainer: {
        marginTop: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer: {
        flex: 0.3,
        // justifyContent: "flex-end",
        // marginTop: "10%",
        marginHorizontal: "10%"
    },
    textContainer: {
        marginHorizontal: "5%"
    },
    heading: {
        color: '#38474F',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 20
    },
    desc: {
        marginTop: "5%",
        color: themeStyle.PRIMARY_TINT_COLOR,
        textAlign: 'left',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10
    },
    bulletpoint: {
        marginTop: "5%",
        color: themeStyle.PRIMARY_TINT_COLOR,
        textAlign: 'left',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10,
        marginLeft:'2%'
    }
})