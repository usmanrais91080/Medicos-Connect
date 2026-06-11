import { Platform, StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

export default StyleSheet.create({
    // upperContainer: {
    //     flex: 1, justifyContent: "center"
    // },
    // lowerContainer: {
    //     flex: 0.7, justifyContent: "flex-end", elevation: 2
    // },
    // modalContainer: {
    //     padding: "5%",
    //     backgroundColor: themeStyle.COLOR_WHITE,
    //     borderTopRightRadius: 15,
    //     borderTopLeftRadius: 15,
    // },
    // grayText: {
    //     color: "#959FAE",
    //     textAlign: "left",
    //     fontSize: 14,
    //     marginBottom: "5%",
    //     fontFamily: themeStyle.FONT_REGULAR
    // },
    // linkText: {
    //     color: "#0ABDE3",
    //     textAlign: "center",
    //     fontSize: 10,
    //     fontFamily: themeStyle.FONT_REGULAR
    // },
    // textContainer: {
    //     justifyContent: "flex-start",
    //     marginTop: "5%",
    //     marginBottom: "15%"
    // },
    googleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#E2E2E2",
        borderRadius:10,
        padding:"5%",
        marginHorizontal: '35%',
      },
      googleButton1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#E2E2E2",
        borderRadius:10,
        padding:"5%",
        marginHorizontal: '5%',
      },
      modalContainer: {
        flex:1,
        padding: '5%',
        paddingTop:Platform.OS=="ios"?"25%":"15%",
        backgroundColor: themeStyle.COLOR_WHITE,
        // borderTopRightRadius: 15,
        // borderTopLeftRadius: 15,
      },
      socialLoginContainer: {
        flexDirection: 'row',
        // marginHorizontal: '15%',
        // backgroundColor:"#e2e2e2",
        // borderRadius:20,
        // padding:"5%",
        justifyContent: 'center',
        alignItems: 'center',
      },
      grayText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 14,
        // paddingVertical: '5%',
        fontFamily: themeStyle.FONT_MEDIUM,
      },
      linkText: {
        color: '#0ABDE3',
        textAlign: 'center',
        fontSize: 14,
        // paddingVertical: '5%',
        fontFamily: themeStyle.FONT_MEDIUM,
      },
      textContainer: {
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:"center",
        marginVertical: '10%',
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      eyeIcon: {
        // position: 'absolute',
        // top: 12,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // left: SCREEN_WIDTH * 0.8
      },
})