import React from "react";
import { TouchableOpacity, View } from "react-native";

import QR from '../../../../assets/svg/qr.svg'
import Search from '../../../../assets/svg/search.svg';
import styles from './style'
export const HeaderRight = ({ onPress }) => {
    return (
        <View style={styles.headerRightContainer}>
            <TouchableOpacity onPress={() => { }} ><QR /></TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={{ marginLeft: 15 }}  ><Search /></TouchableOpacity>
        </View>
    )
}