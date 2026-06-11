import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        height: 282,
        width: 282
    },
    imageStyle1: {
        height: 136,
        width: 136
    },
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    headerStyle: {
        flexDirection: "row",
        height: 55,
        paddingHorizontal: "2.5%",
        // marginLeft: '3%',
        alignItems: "center",
        backgroundColor: themeStyle.YELLOW,
        flex:1
    },
    containerStyle1: {
        height: 40,
        marginBottom: 0,
        paddingHorizontal: 0,

    },
    inputContainerStyle1: {
        height: 40,
        margin: 0,
        paddingLeft: 0,
        borderBottomWidth: 0,
        
    },
    inputStyle1: {
        fontSize: 18,
        marginLeft: '2.5%',
        fontFamily: themeStyle.FONT_REGULAR,
        color: themeStyle.COLOR_BLACK,
        lineHeight: 28,
        fontWeight: '400',
        paddingBottom:10
        
      
    },
})