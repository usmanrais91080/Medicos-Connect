import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";

export default StyleSheet.create({
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    headerTextStyle: {
        fontSize: 22,
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR
    },
    datingStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: "5%",
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: '#FF6B6B',
    },
    filterStyle: {
        alignSelf: "center",
        paddingVertical: "2.5%",
        paddingHorizontal: "5%",
        alignItems: "center",
        borderRadius: 25,
        marginBottom: "2.5%",
        backgroundColor: '#FF6B6B',
    },
    headingStyle: {
        color: 'white',
        fontSize: 12
    },
    container: {
        flex: 1
    },
    btnContainer: {
        flex: 0.2,
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "white",
        paddingHorizontal: "10%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    addFilter: {
        color: '#FF6B6B',
        textAlign: "center",
        fontFamily: themeStyle.FONT_REGULAR
    },
    rowContainer: {
        marginTop: "5%",
        paddingHorizontal: "2.5%",
        backgroundColor: '#E9E9E9',
        height: 50,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    heading: {
        marginLeft: 10,
        marginTop: "5%",
        marginBottom: 5,
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    heading1: {
        marginLeft: 10,
        marginBottom: 5,
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    },
    grayText: {
        marginLeft: 5,
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 12
    }
})