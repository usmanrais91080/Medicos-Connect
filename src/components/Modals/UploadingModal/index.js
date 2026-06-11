import React from 'react';
import { Text,View,StyleSheet,Image } from 'react-native';
import Modal from 'react-native-modal'
import themeStyle from '../../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../lib/utils/constants';

let loadText=["We’re almost done!",
    "HODL (not hold)!",
    "Have a good day!",
    "Drink water!",
    "We are testing your patience!",
    "Have you lost weight!",
    "You look Stunning today!",
    "When nothing is going right, go left",
    "We are walking the dog, please wait!",
    "Winter is coming!",
    "Feel free to spin in your chair!",
    "Help, I am trapped in a loader!",
    "How about this weather, eh!",
    "Still faster than windows update!",
    "We are working really hard …. Really!",
    "Feeding unicorn!",
    "Please wait, the minions are working!",
    "Waking up the minions!",
    "Loads of choices!",
    "Be bold!",
    "Love yourself!",
    "Have some me time!",
    "Dreams come true!",
    "Empowering Medicos!",
    "You are breath taking, Keanu Reeves!",
    "Don’t look up! You did, didn’t you!",
    "Knock knock", 
    "Have you met ted!"
    ];
const UploadingModal = (props) => {
let loadIndex=Math.floor(Math.random()*28);
    return (
        <Modal isVisible={props.visible} >
            <View style={styles.modalContainer}>
            <Image source={require('../../../assets/gifs/loader.gif')}  style={styles.gif}/>
            <Text style={styles.textLoad} >{loadText[loadIndex]}</Text>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: "center",
        justifyContent:'center',
        backgroundColor:themeStyle.COLOR_WHITE,
        height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH,
        alignSelf:'center',
        paddingHorizontal:SCREEN_WIDTH*0.05

    },
    // Modal Style for Filter
    modalContainerFilter: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:themeStyle.PRIMARY_BACKGROUND_COLOR,
        height:SCREEN_HEIGHT*0.5,
        marginBottom:SCREEN_HEIGHT*0.35
    },

    rowContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    colorText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16,
        color: themeStyle.BAR_COLOR
    },
    blackText: {
        fontFamily: themeStyle.FONT_MEDIUM,
        fontSize: 16,
        color: '#B2B2B2'
    },
    headingText: {
        fontFamily: themeStyle.FONT_BOLD,
        fontSize: 21,
        color: '#1F2729',
        textAlign: "center"

    },
    gif:{
        width: 100, 
        height: 100
    },
    textLoad:{
        fontFamily:themeStyle.FONT_REGULAR,
        fontSize:themeStyle.FONT_SIZE_LARGE,
        color:themeStyle.PRIMARY_TINT_COLOR
    }

})

export default UploadingModal;