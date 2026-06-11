import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'

import { Button } from '../../../../components';
import themeStyle from '../../../../assets/styles/theme.style';
import { SCREEN_WIDTH } from '../../../../lib/utils/constants';
import Boost from '../../../../assets/svg/circleboost.svg'

const ConnectFilter = (props) => {
    return (
        <Modal isVisible={props.visible}
            animationInTiming={400}
            animationOutTiming={200}>
            <View style={styles.modalContainer}>
                <View style={{ alignItems: "center" }} >
                    <Boost />
                </View>
                <Text style={{ fontSize: 18, fontFamily: themeStyle.FONT_REGULAR, color: 'gray', textAlign: "center", marginTop: '10%' }}>{`Boost your account to access \nthis feature and much more!`}</Text>
                <View style={{ marginTop: '10%' }}>
                    <Button red title="Go back" onPress={() => props.onClose()} />
                    <Button red title="Boost" onPress={() => props.onBoost()} />
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: "10%",
        backgroundColor: themeStyle.COLOR_WHITE,
        borderRadius: 25
    },
    grayText: {
        color: "#959FAE",
        textAlign: "center",
        fontSize: 10,
        paddingVertical: '5%',
        fontFamily: themeStyle.FONT_REGULAR
    },
    sliderStyle: {
        width: SCREEN_WIDTH * 0.8,
        height: 60,
        marginTop: "5%",
        bottom: 20,
    },
    linkText: {
        color: "#0ABDE3",
        textAlign: "center",
        fontSize: 10,
        paddingVertical: '5%',
        fontFamily: themeStyle.FONT_REGULAR
    },
    textContainer: {
        justifyContent: "flex-start",
        marginTop: "5%",
        marginBottom: "15%"
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ConnectFilter;