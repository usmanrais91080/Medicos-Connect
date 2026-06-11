import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Modal from 'react-native-modal'
// import Tier from '../../../assets/svg/setupprofile.svg'
import Tier from '../../../assets/images/setupProfile.png'
import { AuthenticationHeader, Icon, Input, Button } from '../..';
import themeStyle from '../../../assets/styles/theme.style';


const NotVerifyUserModal = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={{ paddingTop: "10%", marginBottom: "10%", }}>
                    <View style={{ alignItems: "center", marginHorizontal: "5%" }}>
                        {/* <Tier /> */}
                        <Image source={require('../../../assets/images/setupProfile.png')} style={{height:200,width:200}}/>
                        <Text style={styles.grayText1}>Verify Profile</Text>
                        <Text style={styles.grayText}>Please upload your documents to get verified with Medicos Connect.</Text>
                    </View>
                    <Button sky title={'Continue'} onPress={props.onContinue} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    lowerContainer: {
        flex: 0.7, justifyContent: "flex-end", elevation: 2
    },
    modalContainer: {
        padding: "5%",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 15,
    },
    grayText: {
        color: "#959FAE",
        textAlign: "center",
        fontSize: 14,
        marginBottom: "5%",
        fontFamily: themeStyle.FONT_REGULAR
    },
    grayText1: {
        color: "#959FAE",
        textAlign: "center",
        marginTop: "1%",
        fontSize: 22,
        marginBottom: "5%",
        fontFamily: themeStyle.FONT_REGULAR
    },
    linkText: {
        color: "#0ABDE3",
        textAlign: "center",
        fontSize: 10,
        fontFamily: themeStyle.FONT_REGULAR
    },
    textContainer: {
        justifyContent: "flex-start",
        marginTop: "5%",
        marginBottom: "15%"
    },
})

export default NotVerifyUserModal;