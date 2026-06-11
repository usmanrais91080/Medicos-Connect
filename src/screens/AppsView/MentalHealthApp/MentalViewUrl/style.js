import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../lib/utils/constants';

export default StyleSheet.create({
    mainContainer: {
        height: "100%",
        // marginTop: '5%',
        alignItems: 'center'
    },
    videoContainer: {
        height: '100%',
        width: '100%'
    },
    topBar:{
        width:SCREEN_WIDTH,
        paddingTop:"5%",
        flexDirection:'row',backgroundColor:'black',
        paddingHorizontal:SCREEN_WIDTH*0.03,
        justifyContent:'space-between',alignItems:'center',
        height:SCREEN_HEIGHT*0.1

    }
});
