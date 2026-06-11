import { StyleSheet } from "react-native";
import themeStyle from "../../../../assets/styles/theme.style";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../lib/utils/constants";

export default StyleSheet.create({
    headerRightContainer: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center"
    },
    container: {
        flex: 1,
    },
    rowContainer: {
        marginTop: "5%",
        marginHorizontal: "5%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemContainer: {
        flexDirection: "row",
        marginHorizontal: "5%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowStyle: {
        flexDirection: "row",
        alignItems: "center",
    },
    grayHeading: {
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontSize: 18,
        fontFamily: themeStyle.FONT_REGULAR
    },
    blackHeading: {
        color: '#38474F',
        fontSize: 18,
        fontFamily: themeStyle.FONT_REGULAR
    },
    grayText: {
        color: themeStyle.PRIMARY_TINT_COLOR,
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE,
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR
    },
    blackText: {
        color: '#38474F',
        fontSize: 16,
        fontFamily: themeStyle.FONT_MEDIUM
    },
    blackText1: {
        color: '#38474F',
        fontSize: 14,
        fontFamily: themeStyle.FONT_REGULAR
    },
    buttonContainer: {
        backgroundColor: themeStyle.BUTTON_COLOR,
        justifyContent: "center",
        alignItems: "center",
        width: SCREEN_WIDTH * 0.275,
        height: 40,
        borderRadius: 10,
    },
    rowContainer1: {
        marginTop: "1%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    acceptButton: {
        backgroundColor: 'lightgray',
        justifyContent: "center",
        alignItems: "center",
        width: SCREEN_WIDTH * 0.335,
        height: 40,
        borderRadius: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 12,
        fontFamily: themeStyle.FONT_MEDIUM
    },
    graybtnText: {
        color: '#959FAE',
        fontSize: 12,
        fontFamily: themeStyle.FONT_REGULAR
    },
    card: {
        marginHorizontal: '10%',
        marginVertical: '5%',
        height: 149,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: themeStyle.BOOK_KEEPING_LIGHT,
      },
      buttonText: {
        color: '#424242',
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 16,
        // marginBottom: "5%",
      },
      buttonText1: {
        color: '#424242',
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 16,
        top: -10,
      },
      rowContainer: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '20%',
        top: -20,
      },
      inputContainer: {
        marginHorizontal: '15%',
        marginTop: '-10%',
      },
      inputContainerStyle1: {
        height: 40,
        borderColor: themeStyle.COLOR_LIGHT_GREY,
        borderRadius: 10,
        backgroundColor: themeStyle.COLOR_WHITE,
      },
      inputStyle1: {
        fontSize: 14,
        marginLeft: '2.5%',
        fontFamily: themeStyle.FONT_REGULAR,
      },
      lowerContainer: {
        flex: 1,
        backgroundColor: themeStyle.COLOR_WHITE,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
      },
      itemContainer: {
        padding: '5%',
        alignSelf: 'center',
        backgroundColor: themeStyle.COLOR_WHITE,
      },
      itemRowContainer: {
        // marginBottom: "5%",
        width:null,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      modalContainer1: {
        // padding: "7.5%",
        height: SCREEN_HEIGHT * 0.85,
        backgroundColor: themeStyle.COLOR_WHITE,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      },
      modalContainer2: {
        justifyContent: 'center',
        padding: '7.5%',
        height: SCREEN_HEIGHT * 0.25,
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 10,
      },
      titleText: {
        color: '#424242',
        textTransform: 'capitalize',
        fontFamily: themeStyle.FONT_BOLD,
      },
      rightSwipeItem: {
        padding: '5%',
      },
      rightSwipeRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH * 0.3,
        backgroundColor: '#FDDE83',
        padding: '5%',
      },
    
})