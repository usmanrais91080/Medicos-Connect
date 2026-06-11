import { StyleSheet } from 'react-native';
import themeStyle from '../../../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../lib/utils/constants';

export default StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
        flex: 1,
    },
    gif: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginVertical: 40,
    },
    contentContainer: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // width: SCREEN_WIDTH*0.45,
        // paddingVertical: '5%',
        // paddingLeft: '2.5%',
      },
    grayText: {
        color: themeStyle.COLOR_BLACK,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 14,
    },
    textContainer: {
        // backgroundColor: '#FF6B6B',
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        borderRadius: 25,
    },
    textContainer1: {
        borderWidth:1,
        borderColor:"red",
        // backgroundColor: 'white',
        // padding: '2%',
        height: 35,
        width: 100,
        // paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    whiteText: {
        color: themeStyle.COLOR_WHITE,
        fontFamily: themeStyle.FONT_REGULAR,
        fontSize: 10,
    },
    blackText: {
        textAlign: 'center',
        color: themeStyle.COLOR_BLACK_LIGHT,
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 15,
    },
    carouselContainer: {
        borderRadius: 20,
        paddingHorizontal:30,
        flex:1,
        flexDirection:"column",
        backgroundColor: 'pink',
        height:SCREEN_HEIGHT*0.5,

    },
    titleStyle:{
        fontSize:16,
        color:themeStyle.COLOR_BLACK
    },
    buttonflex:{
        marginTop:10,
        justifyContent:"center",alignItems:"center"
    }
});
