import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'

import Tier from '../../../assets/svg/tier.svg'

import { AuthenticationHeader, Icon, Input, Button } from '../..';
import themeStyle from '../../../assets/styles/theme.style';

const LoginOrSignup = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={styles.modalContainer}>
                <View style={{ paddingTop: "10%", marginBottom: "10%", }}>
                    <View style={{ alignItems: "center", marginHorizontal: "15%" }}>
                        <Tier />
                        <Text  style={styles.grayText1}>Tier System</Text>
                        <Text style={styles.grayText}>To become a Tier 1 User you need to complete advanced
                        identification.</Text>
                    </View>

                    <Button title={'Continue'} red onPress={props.onContinue} />
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
        marginTop: "15%",
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

export default LoginOrSignup;