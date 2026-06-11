import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:themeStyle.COLOR_WHITE
  },
  image:{
    width:120,
    height:120
  },
  title:{
    color:themeStyle.CARRER_PRIMARY,
    fontSize:22,
    fontFamily:themeStyle.FONT_BOLD,
    textAlign:'center',
    marginTop:12
  },
  text:{
    fontSize:16,
    fontFamily:themeStyle.FONT_REGULAR,
    textAlign:'center',
    color:themeStyle.COLOR_BLACK,
    marginTop:8,
    marginBottom:95
  },
  button:{
    height:60,
    backgroundColor:themeStyle.COLOR_SILVER,
    justifyContent:'center',
    alignItems:'center',
    width:SCREEN_WIDTH-40,
    marginBottom:8,
    borderRadius:10
  },
  buttonText:{
   fontSize:16,
   color:themeStyle.COLOR_BLACK,
   fontFamily:themeStyle.FONT_REGULAR
  },
  headerRightContainer: {
    flexDirection: "row",
    marginRight: 15,
    alignItems: "center"
},
})