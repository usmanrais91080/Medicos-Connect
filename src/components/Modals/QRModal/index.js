import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Container, Icon } from '../../';
import { route, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../lib/utils/constants';

import themeStyle from '../../../assets/styles/theme.style';
import styles from './style';

const QRMenu = (props) => {
    return (
        <Modal
            isVisible={props.visible}
            animationInTiming={1000}
            onBackdropPress={() => { props.onClose }}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            style={{ margin: 0, }}>
            <View style={{ flexDirection: "row", height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
                <View style={{ flex: 0.3, flexDirection: "column", }}>

                </View>
                <View style={{ flex: 0.7, flexDirection: "column", backgroundColor: "white", }}>
                    <View style={{ flex: 0.6, marginTop: "5%" }}>


                        <View style={styles.menuContainer}>
                            <Icon.AntDesign onPress={props.onClose} name='arrowleft' size={25} color={themeStyle.PRIMARY_TINT_COLOR} />
                            <Text style={styles.menuheading}>QR Setting</Text>
                        </View>

                        <TouchableOpacity onPress={props.onAppliedClasses} style={styles.rowContainer}>
                            <Text style={styles.itemText}>Change Style</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onPostClass} style={styles.rowContainer}>
                            <Text style={styles.itemText}>Reset QR code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onYourClasses} style={styles.rowContainer}>
                            <Text style={styles.itemText}>Download to phone</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 0.3, justifyContent: "flex-end" }}>
                        <View style={[styles.rowContainer2,]}>
                            <Text style={styles.itemText}>App settings</Text>
                        </View>
                        <View style={[styles.rowContainer2, { justifyContent: "flex-end" }]}>
                            <Text style={styles.itemText}>Deactivate Social</Text>
                        </View>
                    </View>

                </View>

            </View>
        </Modal>
    )
}
export default QRMenu;