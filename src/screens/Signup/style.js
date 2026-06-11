import { StyleSheet } from "react-native";
import themeStyle from "../../assets/styles/theme.style";

export default StyleSheet.create({
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
        // padding: '5%',
        paddingTop:Platform.OS=="ios"?"15%":0,
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
        marginVertical: '5%',
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
      checkboxContainer: {
        // marginTop: "10%",
        flexDirection: "row",
       

    },
    textStyle: {
      flex:0.99,
      fontSize: 16,
      textAlign: 'left',
      // lineHeight: 20,
      marginLeft: 10,
      fontFamily: themeStyle.FONT_REGULAR,
      color: themeStyle.COLOR_BLACK
  },
})