import React from "react";
import { Icon } from "../../../../components";
import QR from '../../../../assets/svg/qr.svg'
import styles from './style'
import Modal from 'react-native-modal';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import themeStyle from "../../../../assets/styles/theme.style";
export const HeaderRight = ({onPress,onQR,showQr}) => {
    return (
        <View style={styles.headerRightContainer}>
            {/* {showQr &&<TouchableOpacity onPress={() => onQR()} ><QR /></TouchableOpacity>} */}
            <TouchableOpacity onPress={() => onPress()} style={{ marginLeft: 15 }}  ><Icon.Ionicons name="menu-sharp" size={30} color={themeStyle.COLOR_BLACK} /></TouchableOpacity>
        </View>
    )
};



